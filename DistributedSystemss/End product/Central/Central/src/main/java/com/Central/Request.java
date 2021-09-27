package com.Central;

public class Request {
    public String Type;
    public String Url;
    public String Host;
    public String UserAgent;

    public Request() {
    }

    public Request(String type, String url, String host, String userAgent) {
        Type = type;
        Url = url;
        Host = host;
        UserAgent = userAgent;
    }

    public static Request getReq(String req) {
        if (req.length() == 0) return null;

        String[] tokens = req.split("\r\n");

        String type = tokens[0].split(" ")[0];
        String url = tokens[0].split(" ")[1];
        String host = tokens[1].split(" ")[1];
        String agent = tokens[2].split(" ")[1];

        if (url.contains("favicon")) return null;

        return new Request(type, url, host, agent);
    }
}
