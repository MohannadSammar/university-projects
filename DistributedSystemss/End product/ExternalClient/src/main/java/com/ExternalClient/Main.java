package com.ExternalClient;

import com.rpc.History;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;


public class Main {
    private static int dockerStart = Integer.parseInt(System.getenv("DOCKER_START"));
    private static String[] destinations;
    private static String rpcDestination = System.getenv("RPCDESTINATION");
    private static int rpcPort = Integer.parseInt(System.getenv("RPCPORT"));

    public static ArrayList<String> data = new ArrayList<>();
    public static ArrayList<rpcWork> workers = new ArrayList<>();

    public static void main(String[] arg) {
        if (dockerStart == 0) {
            rpcDestination = "localhost";
            rpcPort = 800;
        }
        FindDestinations(rpcDestination);

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        LaunchServers();
    }



    private static void FindDestinations(String input) {
        destinations = input.split(";");

        for (String str : destinations) {
            String[] locations;
            locations = str.split("-");
            rpcWork tmp = new rpcWork(0, locations[0], Integer.parseInt(locations[1]));
            workers.add(tmp);
        }
    }

    private static void LaunchServers() {
        for (rpcWork Worker : workers) {
            Worker.start();
        }
    }
}
