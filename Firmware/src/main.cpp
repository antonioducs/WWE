#include "main.h"

WiFiServer server(81);
MFRC522 mfrc522(SS_PIN, RST_PIN); // Instance of the class
FirebaseData firebaseData;
Configs configs;
Date data;

void setup()
{
  Serial.begin(9600);
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522
  Serial.println("RFID reading UID");

  Udp.begin(8888);

  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(AMP, INPUT);

  connectWifi();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //carrega as configurações do firebase
  while(!getConfigs()){
    delay(1000);
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);    
  }  
  Serial.println("Configs carregasdas!");
  configs.ligada = false;
 }


void loop()
{
  localTime(&data.segundo, &data.min, &data.hora, &data.dia, &data.dia_semana, &data.mes, &data.ano);

  /* if (millis() - lastTimeAmp >= 10000)
  {
    amperagem = (((((analogRead(AMP) * 0.004882812) - 2.5) * 1000) / 66) / 1.41421356);
  }*/

  if (/*!configs.ligada &&*/ mfrc522.PICC_IsNewCardPresent())
  {
    if (mfrc522.PICC_ReadCardSerial())
    {
      String rfid = "";
      Serial.print("Tag UID:");
      for (byte i = 0; i < mfrc522.uid.size; i++)
      {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
        rfid.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
        rfid.concat(String(mfrc522.uid.uidByte[i], HEX));
        rfid.toUpperCase();
        delay(200);
      }
      Serial.println();
      if(verificaReserva(rfid)){
        configs.ligada = true;
        digitalWrite(LED_GREEN, HIGH);
      }else{
        configs.ligada = false;
        digitalWrite(LED_GREEN, LOW);
      }
    }
  }
}