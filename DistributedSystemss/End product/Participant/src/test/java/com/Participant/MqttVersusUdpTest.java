package com.Participant;

import com.MQTT.Publisher;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class MqttVersusUdpTest {
    private Publisher p;
    private UdpClient u;

    @org.junit.jupiter.api.Test
    void main() {
        p = new Publisher("localhost", "SENSOR", 1883);
        u = new UdpClient("localhost", 12567);

        System.out.println("Testing Performance, MQTT versus UDP");
        System.out.println("====================================");

        sendInformation(10);
        sendInformation(1000); // 1kb
        sendInformation(10000); // 10kb
        sendInformation(100000); // 100kb
        sendInformation(1000000); // 1mb
    }

    long sendTextMqtt(String text) {
        long start = System.nanoTime();
        p.SendMSG(text);
        long end = System.nanoTime();

        return TimeUnit.NANOSECONDS.toMillis(end - start);
    }

    long sendTextUdp(String text) {
        long start = System.nanoTime();
        try {
            u.send(text);
        } catch (IOException e) {
            return -1;
        }
        long end = System.nanoTime();

        return TimeUnit.NANOSECONDS.toMillis(end - start);
    }

    String createString(int size) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb.append(i);
        }
        return sb.toString();
    }

    void sendInformation(int size) {
        System.out.println("Sending " + size + " bytes information");
        String text = createString(size);
        long mqttMs = sendTextMqtt(text);
        long udpMs = sendTextUdp(text);
        System.out.println("MQTT: " + mqttMs + " ms");
        System.out.println(udpMs >= 0.0 ? "UDP : " + udpMs + " ms" : "UDP message failed.");
        System.out.println("\n");
    }
}
