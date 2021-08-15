package com.Central;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Locale;

public class Response {
    public final String status;
    public final String mime;
    public final byte[] data;

    public Response(String status, String mime, byte[] data) {
        this.status = status;
        this.mime = mime;
        this.data = data;
    }

    public static Response from(Request request) {
        if (request == null)
            return new Response("400 Bad Request", "text/html", "Anfrage fehlgeschlagen.".getBytes(StandardCharsets.UTF_8));

        if (!request.Type.equals("GET") || Main.data.size() == 0)
            return new Response("200 OK", "text/html", "Keine Daten vorhanden.".getBytes(StandardCharsets.UTF_8));

        return new Response("200 OK", "text/html", createSite(request).getBytes(StandardCharsets.UTF_8));
    }

    private static String createSite(Request request) {
        String url = request.Url.toLowerCase(Locale.ROOT);
        String identifier = url.contains("consumer") ? "consumer" : url.contains("producer") ? "producer" : "";
        boolean history = url.contains("history");

        StringBuilder out = new StringBuilder();
        for (Object p : getParticipantsToDisplay(identifier, history)) {
            Gson gsonB = new GsonBuilder().setPrettyPrinting().create();
            out.append(gsonB.toJson(p));
        }
        return out.toString();
    }

    public static ArrayList<Object> getParticipantsToDisplay(String identifier, boolean history) {
        Type listOfMyClassObject = new TypeToken<ArrayList<Object>>() {
        }.getType();

        ArrayList<Object> participants = new Gson().fromJson(
                history ? String.valueOf(Main.data) : Main.data.get(Main.data.size() - 1), listOfMyClassObject);
        ArrayList<Object> participantsToDisplay = new ArrayList<>();

        if (identifier.length() == 0) {
            participantsToDisplay = participants;
        } else {
            for (Object p : participants) {
                if (p.toString().contains(identifier))
                    participantsToDisplay.add(p);
            }
        }

        return participantsToDisplay;
    }
}
