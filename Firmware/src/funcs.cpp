#include "main.h"


void connectWifi()
{
    
    digitalWrite(LED_BLUE, LOW);
    digitalWrite(LED_RED, HIGH);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
    }
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_BLUE, HIGH);
}


