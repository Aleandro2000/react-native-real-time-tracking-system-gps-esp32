#include <TinyGPSPlus.h>
#include <WiFi.h>
#include <HardwareSerial.h>

#define RXD2 16
#define TXD2 17
#define GPS_BAUD 9600

TinyGPSPlus gps;

HardwareSerial gpsSerial(1);

const char* ssid = "Smart Tracker ESP32";
const char* password = "Q$vy@dIze~W(efNf~Ogj@Yr7X]c%K9r8(R]^{{xIrcdlM.V(09";

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
  WiFi.softAP(ssid, password);
  server.begin();
  Serial.println("Server started");
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New client connected");
    String request = client.readStringUntil('\r');
    client.flush();
    String jsonResponse = "{";
    unsigned long start = millis();
    bool dataAvailable = false;

    while (millis() - start < 1000) {
      while (gpsSerial.available() > 0) {
        gps.encode(gpsSerial.read());
      }
      if (gps.location.isUpdated()) {
        jsonResponse += "\"latitude\": " + String(gps.location.lat(), 6) + ", ";
        jsonResponse += "\"longitude\": " + String(gps.location.lng(), 6) + ", ";
        jsonResponse += "\"speed_kmph\": " + String(gps.speed.kmph()) + ", ";
        jsonResponse += "\"altitude_m\": " + String(gps.altitude.meters()) + ", ";
        jsonResponse += "\"hdop\": " + String(gps.hdop.value() / 100.0) + ", ";
        jsonResponse += "\"satellites\": " + String(gps.satellites.value()) + ", ";
        jsonResponse += "\"time_utc\": \"" + String(gps.date.year()) + "-" + String(gps.date.month()) + "-" + String(gps.date.day()) + " " + String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second()) + "\"";
        dataAvailable = true;
        break;
      }
    }

    if (!dataAvailable) {
      jsonResponse += "\"error\": \"No GPS data available\"";
    }

    jsonResponse += "}";
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println("Connection: close");
    client.println();
    client.print(jsonResponse);
    delay(1);
    client.stop();
  }

  Serial.println("---------------------------------------");
  if (gps.location.isUpdated()) {
    Serial.print("LAT: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("LONG: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("SPEED (km/h): ");
    Serial.println(gps.speed.kmph());
    Serial.print("ALT (m): ");
    Serial.println(gps.altitude.meters());
    Serial.print("HDOP: ");
    Serial.println(gps.hdop.value() / 100.0);
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
    Serial.print("Time in UTC: ");
    Serial.println(String(gps.date.year()) + "-" + String(gps.date.month()) + "-" + String(gps.date.day()) + " " + String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second()));
  } else {
    Serial.println("Waiting for GPS data...");
  }
  Serial.println("---------------------------------------");
  
  delay(1000);
}
