package com.Participant;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;

public class UdpClient {
    private final int port;
    private InetAddress address;

    public UdpClient(String destination, int port) {
        this.port = port;

        try {
            address = InetAddress.getByName(destination);

        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }

    public void send(String json) throws IOException {
        DatagramSocket udpSocket = new DatagramSocket();
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        DatagramPacket packet = new DatagramPacket(bytes, bytes.length, address, port);
        udpSocket.send(packet);
    }
}
