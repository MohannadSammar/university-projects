# Tests
---

## Central

**MainTest**
- main(): Startet UdpSocketServer und TcpSocketServer auf Port 12569, und misst wie viel Zeit beim versenden eines Paketes verstrichen wird.

**RequestTest**
- testGetReq(): Parst und überprüft ob ein Request vollständig und korrekt eingelesen wird.

**ResponseTest**
- testFrom(): Überprüft ob bei NULL immer ein "400 Bad Request" kommt.

**UdpSocketServerTest**
- testTestRun(): Startet UdpSocketServer und TcpSocketServer auf Port 21598, verschickt 100x einen Text, und überprüft dabei die Dauer.

**OtherStationsTest**
- functionalTest(): Verschickt ein JSON String an eine Station und überprüft ob das was ankommt das gleiche ist wie das was geschickt wurde.
- performanceTest(): Verschickt ein JSON String an eine Station und misst die RTT (Round Trip Time), also die Dauer die gebraucht wurde um das JSON zu schicken und wieder zu empfangen.

---
## Participant
**MainTest**
- main(): Derzeit nichts. (0 = 0 ?)

**UdpClientTest**
- send(): Erstellt ein UdpClient Objekt auf Port 12567 und verschickt 1000x, 3 verschiedene Texte mit unterschiedlichen Längen um die Dauer zu vergleichen, bzw. zu überprüfen.

**MqttVersusUdpTest**
- main(): Verschickt verschiedene Größen von Datenpaketen mit MQTT und mit UDP.

---
## External Client

