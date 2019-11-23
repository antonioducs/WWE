#include "main.h"

byte packetBuffer[48];
WiFiUDP Udp;
IPAddress timeServer(200, 192, 232, 8);

void sendNTPacket()
{
    // set all bytes in the buffer to 0
    memset(packetBuffer, 0, 48);

    // Initialize values needed to form NTP request
    // (see URL above for details on the packets)
    packetBuffer[0] = 0b11100011; // LI, Version, Mode
    packetBuffer[1] = 0;          // Stratum, or type of clock
    packetBuffer[2] = 6;          // Polling Interval
    packetBuffer[3] = 0xEC;       // Peer Clock Precision

    // 8 bytes of zero for Root Delay & Root Dispersion
    packetBuffer[12] = 49;
    packetBuffer[13] = 0x4E;
    packetBuffer[14] = 49;
    packetBuffer[15] = 52;

    // all NTP fields have been given values, now
    // you can send a packet requesting a timestamp:
    Udp.beginPacket(timeServer, 123); //NTP requests are to port 123
    Udp.write(packetBuffer, 48);
    Udp.endPacket();
}

#define LEAP_YEAR(_year) ((_year % 4) == 0)
static byte monthDays[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

void localTime(byte *psec, byte *pmin, byte *phour, byte *pday, byte *pwday, byte *pmonth, byte *pyear)
{
    unsigned long epoch;
    sendNTPacket();
    if (Udp.parsePacket())
    {
        Udp.read(packetBuffer, 48);
        epoch = (word(packetBuffer[40], packetBuffer[41]) << 16 | word(packetBuffer[42], packetBuffer[43])) - 2208988800UL;
        epoch -= (3*60*60);
        byte year;
        byte month, monthLength;
        unsigned long days;

        *psec = epoch % 60;
        epoch /= 60; // now it is minutes
        *pmin = epoch % 60;
        epoch /= 60; // now it is hours
        *phour = epoch % 24;
        epoch /= 24; // now it is days
        *pwday = (epoch + 4) % 7;

        year = 70;
        days = 0;
        while ((unsigned)(days += (LEAP_YEAR(year) ? 366 : 365)) <= epoch)
        {
            year++;
        }
        *pyear = year; // *pyear is returned as years from 1900

        days -= LEAP_YEAR(year) ? 366 : 365;
        epoch -= days; // now it is days in this year, starting at 0

        for (month = 0; month < 12; month++)
        {
            monthLength = ((month == 1) && LEAP_YEAR(year)) ? 29 : monthDays[month]; // month==1 -> february
            if (epoch >= monthLength)
            {
                epoch -= monthLength;
            }
            else
            {
                break;
            }
        }

        *pmonth = month;   // jan is month 0
        *pday = epoch + 1; // day of month
    }
}

String zero(int a)
{
    if (a >= 10)
    {
        return (String)a + "";
    }
    else
    {
        return "0" + (String)a;
    }
}

String diaSemana(byte dia)
{
    String str[] = {"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"};
    return str[dia];
}