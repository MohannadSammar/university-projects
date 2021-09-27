package com.Central;

import com.MQTT.Publisher;
import com.MQTT.Subscriber;
import com.RPChandlers.RPCHistoryhandler;
import com.rpc.Controler;
import com.rpc.History;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TServer.Args;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import java.util.ArrayList;


public class Main {

    public static ArrayList<String> data;
    private static Controler.Client controllerClient;
    private static TTransport transport;
    private static String[] destinations;
    private static ArrayList<OtherStations> otherStations;
    public static History.Processor processor;
    public static RPCHistoryhandler handler;
    private static int dockerStart = Integer.parseInt(System.getenv("DOCKER_START"));
    private static String Other_Centrals = System.getenv("DESTINATION");
    private static int tcpPort = Integer.parseInt(System.getenv("TCP_PORT"));
    private static int RPC_Server_port = Integer.parseInt(System.getenv("RPC_SERVER_PORT"));
    public static String topic = System.getenv("TOPIC");
    public static String reply_topic = System.getenv("REPLY");
    public static int RPC_Client_port = Integer.parseInt(System.getenv("RPC_CLIENT_PORT"));
    public static String RPC_Client_Host = System.getenv("DESTINATION_RPC_CLIENT");
    public static String RPC_Server_Host = System.getenv("DESTINATION_RPC_SERVER");
    public static String MosquittoDestination = System.getenv("MOSQUITTO_DESTINATION");
    public static boolean FLAG_FOR_OFFLINE = true;
    public static void main(String[] args) {
        if (dockerStart == 0) {
            Other_Centrals = "localhost-81";
            tcpPort = 80;
            RPC_Server_port = 800;
            RPC_Client_port = 9090;
            RPC_Client_Host = "localhost";
            RPC_Server_Host = "localhost";
            MosquittoDestination = "test.mosquitto.org";
        }

            otherStations = new ArrayList<>();
            if (!Other_Centrals.equals("none") || Other_Centrals.isEmpty()) {
                FindDestinations(Other_Centrals);
            }else{
                FLAG_FOR_OFFLINE = false;
            }
            data = new ArrayList<>();

            Subscriber sub = new Subscriber(MosquittoDestination, topic, 1883);
            sub.run();
            Publisher pub = new Publisher(MosquittoDestination, reply_topic, 1883);
            pub.start();
            TcpSocketServer tcpSocketServer = new TcpSocketServer(tcpPort);
            tcpSocketServer.start();
            StartRpc();



    }

    private static void FindDestinations(String input) {
        destinations = input.split(";");

        for (String str : destinations) {
            String[] locations;
            locations = str.split("-");
            OtherStations tmp = new OtherStations(locations[0], Integer.parseInt(locations[1]));
            otherStations.add(tmp);
        }
        LaunchServers();
    }

    private static void LaunchServers() {
        for (OtherStations stations : otherStations) {
            stations.start();
        }
    }

    private static void StartRpc() {
        try {
            handler = new RPCHistoryhandler();
            processor = new History.Processor(handler);

            Runnable simple = () -> service(processor);

            new Thread(simple).start();
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    public static void service(History.Processor processor) {
        System.out.println("Waiting for connection on port " + RPC_Server_port);

        try {
            TServerTransport serverTransport = new TServerSocket(RPC_Server_port);
            TServer server = new TSimpleServer(new Args(serverTransport).processor(processor));
            server.serve();
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }

    public static void AddMessageToBuffer(String data){
        for (OtherStations stations : otherStations) {
            stations.Addelemene(data);
        }
    }
}
