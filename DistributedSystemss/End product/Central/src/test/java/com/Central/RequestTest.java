package com.Central;

import junit.framework.TestCase;

public class RequestTest extends TestCase {

    public void testGetReq() {
        Request r = new Request().getReq(
                "GET / HTTP/1.1\r\n" +
                        "Host: localhost:8000\r\n" +
                        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0\r\n" +
                        "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n" +
                        "Accept-Language: de,en;q=0.5\r\n" +
                        "Accept-Encoding: gzip, deflate\r\n" +
                        "DNT: 1\r\n" +
                        "Connection: keep-alive\r\n");
        assertEquals(r.Host, "localhost:8000");
        assertEquals(r.Type, "GET");
        assertEquals(r.Url, "/");
    }
}