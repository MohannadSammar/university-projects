package com.ExternalClient;

import com.rpc.History;
import com.rpc.Package;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import java.util.ArrayList;
import java.util.List;

public class rpcWork extends Thread {
    public ArrayList<String> tmpData;
    private ArrayList<String> mainData;
    private History.Client rpcClient;
    private TTransport transport;
    private int start;
    private boolean work = true;
    public Package pack;
    private List<String> tmp;
    public int amountOfMessages = 0;
    private String location;
    private int port;

    public rpcWork(int start, String location, int port) {
        this.start = 0;
        this.port = port;
        this.location = location;
        mainData = new ArrayList<>();

    }

    public void run() {
        BuildConnection();

        while (true) {
                InitializeRPC();

            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            while (work) {
                mainData.addAll(SendRpc());
            }

            // transport.close();
        }
    }

    public void InitializeRPC() {
        TProtocol protocol = new TBinaryProtocol(transport);
        rpcClient = new History.Client(protocol);
        work = true;
    }

    public void BuildConnection() {
        try {
            transport = new TSocket(location, port);
            transport.open();

        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<String> SendRpc() {
        System.out.println("Sending RPC GetHistory Message To Central on port " + port);
        tmpData = new ArrayList<>();
        try {
            pack = new Package();
            pack = rpcClient.getHistory(start);

        } catch (TException e) {
            e.printStackTrace();
        }
        tmp = pack.Messeges;
        start = pack.Lastint;
        if(tmp.isEmpty()){
            System.out.println("empty respons, Reseting connection ");
            mainData.clear();
            start = 0;
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            BuildConnection();
            InitializeRPC();
            return tmpData;
        }
        for (String s : tmp) {
            if(s.equals("wait")){
                mainData.clear();
                start = 0;
                System.out.println("waiting");
                return tmpData;
            }
            if (s.equals("<EOT>")) {
                work = false;
                amountOfMessages = pack.Lastint;
                //start = 0;
            } else {
                if (!s.isEmpty()) {
                    tmpData.add(s);
                }
            }
        }
        return tmpData;
    }
}