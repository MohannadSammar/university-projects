package com.Central;

import com.RPChandlers.RPCClient;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UdpSocketServer extends Thread {
    private final int port;
    private final byte[] buf;
    private final int Frequency = 5;
    private int counter = 1;

    public UdpSocketServer(int port, int bufferSize) {
        this.port = port;
        this.buf = new byte[bufferSize];
    }

    public void run() {
        try {
            DatagramSocket udpSocket = new DatagramSocket(port);

            while (true) {
                DatagramPacket udpPacket = new DatagramPacket(buf, buf.length);

                udpSocket.receive(udpPacket);
                Main.data.add(new String(udpPacket.getData(), 0, udpPacket.getLength()));
                if (counter % Frequency == 0) {
                    new Thread(RPCClient.Deserialize).start();
                    counter++;
                } else {
                    counter++;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

