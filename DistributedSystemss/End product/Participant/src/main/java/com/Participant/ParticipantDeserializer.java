package com.Participant;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ParticipantDeserializer implements JsonDeserializer<Participant> {
    private final Map<String, Class<? extends Participant>> participantTypeRegistry = new HashMap() {
        {
            put("consumer", Consumer.class);
            put("producer", Producer.class);
        }
    };

    public Participant deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
        JsonObject participantObject = json.getAsJsonObject();
        String participantTypeElementName = "identifier";
        JsonElement participantTypeElement = participantObject.get(participantTypeElementName);

        Class<? extends Participant> participantType = participantTypeRegistry.get(participantTypeElement.getAsString());
        return new Gson().fromJson(participantObject, participantType);
    }

    public ArrayList<Participant> getList(String json) {
        Gson gson = new GsonBuilder().registerTypeAdapter(Participant.class, this).create();
        return gson.fromJson(json, new TypeToken<ArrayList<Participant>>() {
        }.getType());
    }
}
