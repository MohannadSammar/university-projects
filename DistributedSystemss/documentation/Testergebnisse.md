# Testergebnisse

## Central

**RPCClientTest**

_CheckIfExpectedArgumentsAreAlsoSent()_:
```
open
Reply from Participants Recieved
11 Mili Seconds For the function to Reconcognize What to do and  
send and Recieve a RPC message 
```

**OtherStationsTest**
_functionalTest()_:
```
Success
```
_performanceTest()_:
```
Success
Message received 8000 

7 ms
```

---
## ExternalClient

**rpcWorkTest**

_CheckRPCSpeedAndReturnValues()_:

```
Sending RPC GetHistory Message To Central
30 Mili Seconds For RPC to send and Recieve a message back
```

---
## Participant

**MqttVersusUdpTest**

_main()_:

```
Testing Performance, MQTT versus UDP
====================================
Sending 10 bytes information
MQTT: 66 ms
UDP : 6 ms


Sending 1000 bytes information
MQTT: 13 ms
UDP : 0 ms


Sending 10000 bytes information
MQTT: 17 ms
UDP : 0 ms


Sending 100000 bytes information
MQTT: 26 ms
UDP message failed.


Sending 1000000 bytes information
MQTT: 66 ms
UDP message failed.
```

**UdpClientTest**

_send()_:

```
Kurzer Text: 151 ms
Mittellanger Text: 143 ms
Langer Text: 158 ms
```