package com.MQTT;

import com.Central.Main;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.nio.charset.StandardCharsets;

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
            System.out.println("Connected, " + topic);
            
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
