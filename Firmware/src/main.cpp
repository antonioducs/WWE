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
  pinMode(LED_BLUE, OUTPUT);
  pinMode(RELE, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  digitalWrite(RELE, HIGH);
  digitalWrite(LED_GREEN, LOW);

  connectWifi();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //carrega as configurações do firebase
  while (!getConfigs())
  {
    delay(1000);
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  }
  Serial.println("Configs carregasdas!");
}

unsigned long lastTimeAmp = 0;
int amp = 0;

void loop()
{
  localTime(&data.segundo, &data.min, &data.hora, &data.dia, &data.dia_semana, &data.mes, &data.ano);

  if (configs.ligada && (millis() - lastTimeAmp) >= 2000)
  {
    lastTimeAmp = millis();
    amp = analogRead(A0);
    Serial.println(amp);
    //if(amp > 500){
  //    configs.ligada = false;
   //   digitalWrite(LED_GREEN, LOW);
   //   digitalWrite(RELE, HIGH);
 //   }
  }

  if (!configs.ligada && mfrc522.PICC_IsNewCardPresent())
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
      if (verificaReserva(rfid))
      {
        digitalWrite(LED_GREEN, HIGH);
        digitalWrite(RELE, LOW);
        configs.ligada = true;
      }
    }
  }
}