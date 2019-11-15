#include "main.h"

WiFiServer server(81);

MFRC522 mfrc522(SS_PIN, RST_PIN); // Instance of the class

void setup()
{
  Serial.begin(9600);
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522
  Serial.println("RFID reading UID");

  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(AMP, INPUT);
}

unsigned long lastTimeAmp = 0;
double amperagem;

void loop()
{
  
  if(millis() - lastTimeAmp >= 10000){
    amperagem = (((((analogRead(AMP) * 0.004882812) - 2.5)*1000)/66)/ 1.41421356);
  }

   if (mfrc522.PICC_IsNewCardPresent())
  {
    if (mfrc522.PICC_ReadCardSerial())
    {
      Serial.print("Tag UID:");
      for (byte i = 0; i < mfrc522.uid.size; i++)
      {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
        digitalWrite(LED_GREEN, HIGH);
        delay(200);
        digitalWrite(LED_GREEN, LOW);
      }
      Serial.println();
      mfrc522.PICC_HaltA();
    }
  }
}