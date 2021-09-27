package com.MQTT;

import com.Participant.Main;
import org.eclipse.paho.client.mqttv3.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Stack;
import java.util.Timer;
import java.util.TimerTask;

public class Publisher {
    private String location;
    private int port;
    private String serverURI;
    private String topic;
    private MqttClient mqttClient;

    public ArrayList<String> downtimeSensorData;
    private int ind;

    public Publisher(String location, String topic, int port) {
        this.location = location;
        this.topic = topic;
        this.port = port;
        serverURI = "tcp://" + this.location + ":" + this.port;
        downtimeSensorData = new ArrayList<>();
        setup();
    }

    private void setup()
    {
        try {
            mqttClient = new MqttClient(serverURI, MqttClient.generateClientId());
            mqttClient.connect();
            System.out.println("Connected, " + topic);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void SendMSG(String msg) {

            try {
                MqttMessage message = new MqttMessage();
                message.setPayload(msg.getBytes());
                message.setQos(2);
                mqttClient.publish(topic, message);
                //mqttClient.disconnect();
            } catch (MqttException e) {
                e.printStackTrace();
            }
    }

}
