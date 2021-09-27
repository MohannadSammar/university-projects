package com.Central;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.TimeUnit;

class MainTest {

    @org.junit.jupiter.api.Test
    void main() {
        int port = 12569;
        Main.main(new String[]{
                String.valueOf(port), String.valueOf(port)
        });

        long start = System.nanoTime();

        try {
            URL url = new URL("https://localhost:" + port);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            System.out.println("Status: " + status);
            System.out.println("content: " + content);
        } catch (Exception e) {
            e.printStackTrace();
        }


        long end = System.nanoTime();
        System.out.println(TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
    }
}