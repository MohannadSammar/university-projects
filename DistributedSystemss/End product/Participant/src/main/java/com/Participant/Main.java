package com.Participant;

import com.MQTT.Publisher;
import com.MQTT.Subscriber;
import com.google.gson.GsonBuilder;
import com.rpc.Controler;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TTransportException;

import java.net.ServerSocket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static ArrayList<Participant> participants = new ArrayList<Participant>();
    public static Controler.Processor processor;
    public static RPChandler handler;
    private static final int dockerStart = Integer.parseInt(System.getenv("DOCKER_START"));
    private static String destination = System.getenv("DESTINATION");
    private static int consumerCount = Integer.parseInt(System.getenv("CONSUMER_COUNT"));
    public static int producerCount = Integer.parseInt(System.getenv("PRODUCER_COUNT"));
    public static int rpcPort = Integer.parseInt(System.getenv("RPC_PORT"));
    public static String rpcHost = System.getenv("DESTINATION_RPC");
    public static String mosquittoDestination = System.getenv("MOSQUITTO_DESTINATION");
    public static String topic = System.getenv("TOPIC");
    public static String reply_topic = System.getenv("REPLY");
    public static Publisher publisher;
    public static boolean centralIsDown = false;
    public static int Time =0 ;
    public static Queue<String> que ;
    public static void main(String[] args) {
        if (dockerStart == 0) {
            destination = "localhost";
            consumerCount = 5;
            producerCount = 2;
            rpcPort = 9090;
            rpcHost = "localhost";
            mosquittoDestination = "test.mosquitto.org";
        }
        que = new LinkedList<>();
            for (int i = 0; i < consumerCount; i++) {
                participants.add(new Consumer());
            }

            for (int i = 0; i < producerCount; i++) {
                participants.add(new Producer());
            }

            for (Participant current : participants) {
                Thread t = new Thread(() -> CallWork(current));
                t.start();
            }
        
        publisher = new Publisher(mosquittoDestination, topic, 1883);
        Subscriber sub = new Subscriber(mosquittoDestination, reply_topic, 1883);
        sub.run();
        Thread t = new Thread(Main::SendJson);
        t.start();
        Thread Timer = new Thread(() -> MannegeTimer());
        Timer.start();
        handler = new RPChandler();
        processor = new Controler.Processor(handler);

        Runnable simple = () -> service(processor);
        new Thread(simple).start();
    }

    public static void service(Controler.Processor processor) {
        System.out.println("Waiting for connection on port " + rpcPort);

        try {
            TServerSocket socket = new TServerSocket(rpcPort);
            ServerSocket serverSocket = socket.getServerSocket();
            serverSocket.setSoTimeout(3000);
            TServer server = new TSimpleServer(new TServer.Args(socket).processor(processor));
            server.serve();
        } catch (TTransportException | SocketException e) {
            e.printStackTrace();
        }
    }

    private static void CallWork(Participant t) {
        while (true) t.Work();
    }

    public static void MannegeTimer(){

        while (true){
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            Time++;
            if(Time >= 4){
                centralIsDown = true;
            }else{
                centralIsDown = false;
            }

        }

    }
    public static void SendJson() {
        // UdpClient udpClient = new UdpClient(destination, udpPort);
        boolean FLAG_FOR_OFFLINE = false;
        int tmp = 0;
        while (true) {
            // Will be removed later
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if(centralIsDown){
                String json = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(participants);
                que.add(json);
                System.out.println("added to que");
               // FLAG_FOR_OFFLINE = true;
            }
            while(!que.isEmpty() && !centralIsDown){
//                if(FLAG_FOR_OFFLINE){
//                    //publisher.SendMSG("504");
//                    FLAG_FOR_OFFLINE = false;
//                    continue;
//                }
                publisher.SendMSG(que.remove());
                System.out.println("sent from que");
            }
            String json = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(participants);
            publisher.SendMSG(json);
        }
    }
}
