package com.Central;


import com.rpc.Package;
import com.rpc.SensorConnection;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;

public class OtherStations extends Thread implements SensorConnection.Iface {
    private OtherStations handler;
    private SensorConnection.Processor processor;
    public SensorConnection.Client rpcClient;
    private TTransport transport;
    private final String location;
    private final int Port;
    public ArrayList<String> SensorData;
    private Queue<String> que ;
    private Semaphore sem;
    public static ReentrantLock lock = new ReentrantLock();
    private int start = 1;
    public OtherStations(String location, int port) {
        this.location = location;
        Port = port;
        SensorData = new ArrayList<>();
        que = new LinkedList<>();
        sem = new Semaphore(0);
        System.out.println("connected to " + location + " on " + Port);
        StartRpc();
    }
    public void Addelemene(String element){
        que.add(element);
        sem.release();
    }
    public void run() {
        BuildConnection();
        InitializeRPC();
        if(!lock.isLocked()) {
            lock.lock();
            RetriveData();
        }
        while (true) {
            try {
                sem.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
                SendRpc(que.remove());
        }
    }

    public String SendRpc(String data) {
        if (!data.isEmpty()) {
            try {
                return rpcClient.SendSensorData(data);
            } catch (TException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public void RetriveData(){
        System.out.println("Retreving lost data/ Checking for lost data");
        while (Main.FLAG_FOR_OFFLINE) {
            ArrayList<String> tmpData = new ArrayList<>();
            Package pack = null;
            try {
                pack = new Package();
                pack = rpcClient.getLostData(start);

            } catch (TException e) {
                e.printStackTrace();
            }
            List<String> tmp = pack.Messeges;
            start = pack.Lastint;
            for (String s : tmp) {
                if (s.equals("<EOT>")) {
                    Main.FLAG_FOR_OFFLINE = false;
                    System.out.println("Retrevied all Lost Data");
                    //set gloabal flag to continue working like normal
                } else {
                    if (!s.isEmpty()) {
                        System.out.println(s);
                        tmpData.add(s);
                    }
                }
            }
            Main.data.addAll(tmpData);
        }
    }
    

    public void InitializeRPC() {
        TProtocol protocol = new TBinaryProtocol(transport);
        rpcClient = new SensorConnection.Client(protocol);
    }

    public void BuildConnection() {
        try {
            transport = new TSocket(location, Port);
            transport.open();
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }

    private void StartRpc() {
        try {
            handler = this;
            processor = new SensorConnection.Processor(handler);

            Runnable simple = () -> service(processor);

            new Thread(simple).start();
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    public void service(SensorConnection.Processor processor) {
        System.out.println("Waiting for connection");

        try {
            TServerTransport serverTransport = new TServerSocket(Port);
            TServer server = new TSimpleServer(new TServer.Args(serverTransport).processor(processor));
            server.serve();
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }


    @Override
    public String SendSensorData(String Data) throws TException {
        if (Data.isEmpty()) {
            return "Failed";
        } else {
            SensorData.add(Data);
            return "Success";
        }
    }

    @Override
    public Package getLostData(int Start) throws TException {
        Package message = new Package();
        for (int i = 0; i < 10; i++) {
            if (Start >= SensorData.size()) {
                message.Messeges.add("<EOT>");
                break;
            }
            message.Messeges.add(SensorData.get(Start++));
        }
        message.Lastint = Start;
        return message;
    }
}
