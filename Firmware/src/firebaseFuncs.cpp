#include "main.h"

bool getConfigs()
{
    if (Firebase.getInt(firebaseData, "/configs/tempoCicloEmMinutos"))
    {
        if (firebaseData.dataType() == "int")
            configs.tempoCicloEmMinutos = firebaseData.intData();

        if (Firebase.getInt(firebaseData, "/configs/tempoMinimo"))
        {
            if (firebaseData.dataType() == "int")
                configs.tempoMinimo = firebaseData.intData();
        }
        else
        {
            Serial.println("Falha na leitura do tempo minimo");
            Serial.println(firebaseData.errorReason());
            return false;
        }
    }
    else
    {
        Serial.println("Falha na leitura do tempo de ciclo");
        Serial.println(firebaseData.errorReason());
        return false;
    }
    return true;
}

bool verificaReserva(String rfid)
{
    String uid = "", stringTempo = "";
    byte hora = 0, minuto = 0;
    if (Firebase.getString(firebaseData, "/rfid/" + rfid + "/userid")) //procuda rfid no BD
    {
        if (firebaseData.dataType() == "string")
        {
            uid = firebaseData.stringData();                                    //obtem id do usuário que possui esse rfid
            if (Firebase.getArray(firebaseData, "/users/" + uid + "/horarios")) //procura horário do usuario por sua ID
            {
                Serial.println();
                if (firebaseData.dataType() == "array")
                {
                    FirebaseJsonArray &arr = firebaseData.jsonArray();
                    for (size_t i = 0; i < arr.size(); i++)
                    {
                        FirebaseJsonData &jsonData = firebaseData.jsonData();
                        arr.get(jsonData, i);
                        if (jsonData.typeNum == JSON_STRING)
                        {
                            stringTempo = "" + zero(data.dia) + "" + zero(data.mes + 1) + "" + (data.ano + 1900);
                            if (jsonData.stringValue.substring(0, 8).equals(stringTempo)) //verifica se o horário encontrado é igual do dia atual
                            {
                                hora = (jsonData.stringValue.charAt(8) - 48) * 10 + jsonData.stringValue.charAt(9) - 48;
                                minuto = (jsonData.stringValue.charAt(10) - 48) * 10 + jsonData.stringValue.charAt(11) - 48;
                                if ((data.hora == hora && data.min >= minuto) || data.hora > hora) //confere horários
                                {
                                    int dif = ((hora * 60) + minuto + configs.tempoCicloEmMinutos) - ((data.hora * 60) + data.min);
                                    if (dif > configs.tempoMinimo)
                                        return true;
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                Serial.println("Erro uid!");
                Serial.println(firebaseData.errorReason());
            }
        }
    }
    else
    {
        Serial.println("Erro rfid!");
        Serial.println(firebaseData.errorReason());
    }
    return false;
}