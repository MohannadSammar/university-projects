package com.Participant;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

class UdpClientTest {

    @Test
    void send() throws IOException {
        UdpClient u = new UdpClient("localhost", 12567);

        // Kurzer Text
        long start1 = System.nanoTime();
        for (int i = 0; i < 1000; i++) {
            u.send("Hah");
        }
        long end1 = System.nanoTime();

        // Mittellanger Text
        long start2 = System.nanoTime();
        for (int i = 0; i < 1000; i++) {
            u.send("System.out.println(TimeUnit.NANOSECONDS.toMillis(end1 - start1)msTimeUnit.NANOSECONDS.toMillis(end2 - start2)ms;");
        }
        long end2 = System.nanoTime();

        // Langer Text (2800+ Zeichen)
        long start3 = System.nanoTime();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        for (int i = 0; i < 1000; i++) {
            u.send(sb.toString());
        }
        long end3 = System.nanoTime();

        System.out.println(
                "Kurzer Text: " + TimeUnit.NANOSECONDS.toMillis(end1 - start1) + " ms\n" +
                        "Mittellanger Text: " + TimeUnit.NANOSECONDS.toMillis(end2 - start2) + " ms\n" +
                        "Langer Text: " + TimeUnit.NANOSECONDS.toMillis(end3 - start3) + " ms");
    }
}