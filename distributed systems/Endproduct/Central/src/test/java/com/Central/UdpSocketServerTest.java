//package com.Central;
//
//import com.Participant.UdpClient;
//import junit.framework.TestCase;
//
//import java.io.IOException;
//import java.util.concurrent.TimeUnit;
//
//public class UdpSocketServerTest extends TestCase {
//
//    public void testTestRun() throws IOException {
//        int port = 21598;
//        Main.main(new String[]{
//                String.valueOf(port), String.valueOf(port)
//        });
//
//        UdpClient udpClient = new UdpClient("localhost", port);
//
//        long start = System.nanoTime();
//        for (int i = 0; i < 100; i++) {
//            udpClient.send("Hallo");
//        }
//        long end = System.nanoTime();
//        System.out.println(TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
//    }
//}