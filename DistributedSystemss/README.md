# **Verteilte Systeme**

[**Anforderungsanalyse**](documentation/Anforderungsanalyse.pdf)

---

## Dokumentation

- Sprache: Java
- Build Tool: Maven
- RPC Bibliothek: Apache Thrift
- MQTT: mosquitto

---


## Docker Container:

1. Teilnehmer: Erzeuger / Verbraucher
2. Zentrale: HTTP Server
3. Externer Client

---

## Dockerfile Beispiel
```docker
FROM maven:3.8.1-openjdk-11-slim AS build

RUN mkdir -p /app
COPY . /app/
WORKDIR /app
RUN mvn package


FROM openjdk:11.0-jre-slim

EXPOSE 8000/udp

RUN mkdir -p /app
COPY --from=build /app/target/central-1.0-SNAPSHOT.jar /app

CMD [ "java", "-jar", "/app/central-1.0-SNAPSHOT.jar" ]
```

---

## Docker Compose:

```docker
version: "3"
services:
  vs_participant:
    image: vs/participant
    container_name: vs_participant
    build:
      context: ./Participant
      dockerfile: Dockerfile
    environment:
      - DOCKER_START=1
      - DESTINATION=vs_central
      - TCP_PORT=8000
      - UDP_PORT=8000
      - PRODUCER_COUNT=2
      - CONSUMER_COUNT=3
    expose: 
      - 80/tcp
      - 8000/tcp
      - 8000/udp
    depends_on:
      - "vs_central"
    links: 
      - vs_central

  vs_central:
    image: vs/central
    container_name: vs_central
    build:
      context: ./Central
      dockerfile: Dockerfile
    environment:
      - DOCKER_START=1
      - DESTINATION=vs_participant
      - TCP_PORT=8000
      - UDP_PORT=8000
    expose: 
      - 80/tcp
      - 8000/tcp
      - 8000/udp
    ports:
      - "80:80"
```
---

## Enviroment:

```docker
- DESTINATION -> destination host name.
- TCPPORT -> TCP port
- UDPPORT -> UDP port
- VERBRAUCHERN -> Anzahl der Verbraucher.
- ERZEUGERN -> Anzahl der Erzeuger.
- DOCKERSTART -> Zeigt ob es in Docker läuft oder nicht, somit kann man auch durch den localhost eine verbindung bauen.
```
---

## Port:
- 80:80 -> Für den http server bilden wir eine Verbindung auf port 80 in docker zu port 80 an den Host. 

## Java Bibliotheken

- Apache Thrift
- GSON (https://github.com/google/gson)
- Mosquitto (https://mosquitto.org/)

## Selbst Testen:

`make build`


Alternativ:

```
docker-compose down -v
docker-compose build
docker-compose up -d
```
