#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>
#include <FirebaseArduino.h>
#include <Ticker.h>


#define SS_PIN 15 //D8
#define RST_PIN 0 //D3

#define LED_RED 5 //D1
#define LED_GREEN 16 //D0

#define AMP 17//A0


//configs firebase
#define FIREBASE_HOST "https://wwdb-e4fd3.firebaseio.com/"
#define FIREBASE_AUTH "0hEx7ndm1OPSbL7GrZdeKHSBgNhQu8tP25nAySGQ"
//Post every 1 minutes
#define PUBLISH_INTERVAL 1000*60*1

//config WiFi
#define WIFI_SSID "Monitora"
#define WIFI_PASSWORD "monitora123"



//rfid
//RST - D2
//MISO = D6
//MOSI - D7
//SCK - D5
//SDA - D4