package com.MQTT;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class Subscriber {
    private String location;
    private int port;
    private String serverURI;
    private String topic;

    public Subscriber(String location, String topic, int port) {
        this.location = location;
        this.topic = topic;
        this.port = port;
        serverURI = "tcp://" + this.location + ":" + this.port;
    }

    public void run() {
        try {
            MqttClient client = new MqttClient(serverURI, MqttClient.generateClientId());
            client.setCallback(new MQTTCallback());
            client.connect();
            client.subscribe(topic);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}

