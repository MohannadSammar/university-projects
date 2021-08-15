package com.MQTT;

import com.Central.Main;
import com.Central.OtherStations;
import com.RPChandlers.RPCClient;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.util.concurrent.locks.ReentrantLock;

public class MQTTCallback implements MqttCallback {
    int counter = 1;
    private final int frequency = 5;
    private final String CONNECTION_LOST = "504";
    public static ReentrantLock lock = new ReentrantLock();

    @Override
    public void connectionLost(Throwable throwable) {
        System.out.println("Connection to Broker lost !");
    }

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
        if(!Main.FLAG_FOR_OFFLINE) {
            String Data = new String(mqttMessage.getPayload());
                Main.data.add(Data);
                Thread Manneger = new Thread(() -> Main.AddMessageToBuffer(Data));
                Manneger.start();
                if (counter % frequency == 0) {
                    new Thread(RPCClient.Deserialize).start();
                }
                counter++;
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
    }
}
