#include "main.h"
#include "EmonLib.h"                   // Include Emon Library
EnergyMonitor emon1;
#define CURRENT_CAL 18.40 //VALOR DE CALIBRAÇÃO (DEVE SER AJUSTADO EM PARALELO COM UM MULTÍMETRO MEDINDO A CORRENTE DA CARGA)
float ruido = 0.07; //RUÍDO PRODUZIDO NA SAÍDA DO SENSOR (DEVE SER AJUSTADO COM A CARGA DESLIGADA APÓS CARREGAMENTO DO CÓDIGO NO ARDUINO)


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

  emon1.current(A0, CURRENT_CAL);//Função para calibrar o sensor de corrente

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
    emon1.calcVI(20,100); //FUNÇÃO DE CÁLCULO (20 SEMICICLOS / TEMPO LIMITE PARA FAZER A MEDIÇÃO)
    double currentDraw = emon1.Irms; //VARIÁVEL RECEBE O VALOR DE CORRENTE RMS OBTIDO
    Serial.print("Corrente medida: "); //IMPRIME O TEXTO NA SERIAL
    Serial.print(currentDraw); //IMPRIME NA SERIAL O VALOR DE CORRENTE MEDIDA
    currentDraw = currentDraw-ruido; //VARIÁVEL RECEBE O VALOR RESULTANTE DA CORRENTE RMS MENOS O RUÍDO
    Serial.println("A"); //IMPRIME O TEXTO NA SERIAL
    if(currentDraw < 0.0){ //SE O VALOR DA VARIÁVEL FOR MENOR QUE 0, FAZ 
      currentDraw = 0.0; //VARIÁVEL RECEBE 0
    }

    lastTimeAmp = millis();
    //amp = analogRead(A0);
    //Serial.println(amp);
    if(currentDraw == 0.0){
      configs.ligada = false;
      digitalWrite(LED_GREEN, LOW);
      digitalWrite(RELE, HIGH);
    }
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