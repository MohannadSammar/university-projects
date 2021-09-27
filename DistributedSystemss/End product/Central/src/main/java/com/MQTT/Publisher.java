package com.MQTT;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class Publisher extends Thread{
    private String location;
    private int port;
    private String serverURI;
    private String topic;
    private MqttClient mqttClient;



    public Publisher(String location, String topic, int port) {
        this.location = location;
        this.topic = topic;
        this.port = port;
        serverURI = "tcp://" + this.location + ":" + this.port;
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
    public void run()
    {
        String msg = "Online";
        while (true) {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                MqttMessage message = new MqttMessage();
                message.setPayload(msg.getBytes());
                message.setQos(2);
                mqttClient.publish(topic, message);
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
    }

}
