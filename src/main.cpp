#include "main.h"

WiFiServer server(81);

void setup() {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, LOW);

  WiFi.begin("Monitora", "monitora123");

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
  }

  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, HIGH);

}

void loop() {
  
}