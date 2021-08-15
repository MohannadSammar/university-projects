package com.RPChandlers;

import com.Central.Main;
import com.Central.Response;
import com.rpc.Controler;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class RPCClient {
    private static TTransport transport;
    private static Controler.Client rpcClient;

    public static Runnable Deserialize = () -> Deserialize();
    public static HashMap<Integer, Integer> MaximumCapacity;
    public static HashMap<Integer, Integer> EnergyAmount;
    public static boolean first = false;
    public static String status = "";

    public RPCClient() {
    }

    public static void Deserialize() {
        String[] pr;
        MaximumCapacity = new HashMap<Integer, Integer>();
        EnergyAmount = new HashMap<Integer, Integer>();

        ArrayList<Object> producers = Response.getParticipantsToDisplay("producer", false);
        for (Object ob : producers) {
            pr = ob.toString().split(",");
            int id = 0;
            int MaxCap = 0;

            for (String str : pr) {
                if (str.contains("maxCapacity")) {
                    MaxCap = ExtractMaximumCapacity(str);
                }

                if (str.contains("id") && !str.contains("identifier")) {
                    id = ExtractID(MaximumCapacity, MaxCap, str);
                }

                if (str.contains("currentEnergyAmount")) {
                    ExtractCurrentEnergyAmount(EnergyAmount, id, str);
                }
            }
            if (!first) {
                //Thread t = new Thread(RPCClient::setupRPC);
                setupRPC(Main.RPC_Client_Host, Main.RPC_Client_port);
                first = true;
            }
        }

        RPCFunction();
    }

    public static void setupRPC(String Location, int Port) {
        try {
            transport = new TSocket(Location, Port);
            transport.open();

            System.out.println("open");
            TProtocol protocol = new TBinaryProtocol(transport);
            rpcClient = new Controler.Client(protocol);
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }

    public static void RPCFunction() {
        for (Map.Entry<Integer, Integer> entry : MaximumCapacity.entrySet()) {
            int id = entry.getKey();
            int maxCapacity = entry.getValue();
            status = "";
            String msg = "";

            if (maxCapacity == EnergyAmount.get(id)) {
                //send RPC to stop
                try {
                    msg = "STOP";
                    status = rpcClient.Control(id, msg);
                    continue;
                } catch (TException e) {
                    e.printStackTrace();
                }
            }
            if (maxCapacity / 4 > EnergyAmount.get(id)) {
                //Send RPC to work faster.
                try {
                    msg = "DOUBLETIME";
                    status = rpcClient.Control(id, msg);

                    continue;
                } catch (TException e) {
                    e.printStackTrace();
                }
            }
            if (maxCapacity / 2 > EnergyAmount.get(id)) {
                //Send RPC to work
                try {
                    msg = "PRODUCE";
                    status = rpcClient.Control(id, msg);
                } catch (TException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static int ExtractMaximumCapacity(String str) {
        int equals = str.indexOf("=");
        int point = str.indexOf(".");
        return Integer.parseInt(str.substring(equals + 1, point));
    }

    public static int ExtractID(HashMap<Integer, Integer> maximumCapacity, int maxCap, String str) {
        int equals = str.indexOf("=");
        int id = Integer.parseInt(String.valueOf(str.charAt(equals + 1)));
        maximumCapacity.put(id, maxCap);
        return id;
    }

    public static void ExtractCurrentEnergyAmount(HashMap<Integer, Integer> energyAmount, int id, String str) {
        int equals = str.indexOf("=");
        int point = str.indexOf(".");
        int value = Integer.parseInt(str.substring(equals + 1, point));
        energyAmount.put(id, value);
    }
}

