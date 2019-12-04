#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SPI.h>
#include <MFRC522.h>
#include <WiFiUdp.h>

#define SS_PIN 15 //D8
#define RST_PIN 0 //D3

#define RELE 2       //D4
#define LED_RED 5    //D1
#define LED_BLUE 16 //D0

#define LED_GREEN 4 //D2

#define AMP 17 //A0

//configs firebase
#define FIREBASE_HOST "wwdb-e4fd3.firebaseio.com"
#define FIREBASE_AUTH "0hEx7ndm1OPSbL7GrZdeKHSBgNhQu8tP25nAySGQ"
//Post every 1 minutes
#define PUBLISH_INTERVAL 1000 * 60 * 1

//config WiFi
#define WIFI_SSID "MaxtorIV"
#define WIFI_PASSWORD "HYjvpJYv"

//rfid
//RST - D2
//MISO = D6
//MOSI - D7
//SCK - D5
//SDA - D4

//////////Funções
void connectWifi();
void localTime(byte *psec, byte *pmin, byte *phour, byte *pday, byte *pwday, byte *pmonth, byte *pyear);
String zero(int a);
bool getConfigs();
bool verificaReserva(String rfid);

//structs
typedef struct
{
    byte ano;
    byte mes;
    byte dia;
    byte dia_semana;
    byte hora;
    byte min;
    byte segundo;
} Date;

typedef struct
{
    int tempoCicloEmMinutos;
    int tempoMinimo;
    bool ligada;
} Configs;

//variaveis globais
extern WiFiUDP Udp;
extern FirebaseData firebaseData;
extern Configs configs;
extern Date data;