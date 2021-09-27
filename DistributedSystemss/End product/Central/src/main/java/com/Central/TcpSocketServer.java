package com.Central;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class TcpSocketServer extends Thread {
    private final int port;

    public TcpSocketServer(int port) {
        this.port = port;
    }

    public void run() {
        System.out.println("Server wurde auf Port " + port + " gestartet http://localhost:" + port + "/");

        while (true) {
            try {
                manageSocketConnection();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void manageSocketConnection() throws IOException {
        ServerSocket serverSocket = new ServerSocket();
        serverSocket.setReuseAddress(true);
        serverSocket.bind(new InetSocketAddress(port));

        Socket socket = serverSocket.accept();

        InputStream is = socket.getInputStream();
        OutputStream os = socket.getOutputStream();

        Scanner scanner = new Scanner(is).useDelimiter("\r\n\r\n");
        String httpReq = scanner.hasNext() ? scanner.next() : "";
        Request request = new Request().getReq(httpReq);

        if (request != null) {
            Response response = Response.from(request);
            os.write(response.data);
        }

        is.close();
        os.close();
        socket.close();
        serverSocket.close();
    }
}
