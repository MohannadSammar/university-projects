package com.ExternalClient;

import com.rpc.History;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

class rpcWorkTest {
    @org.junit.jupiter.api.Test

    //checks how much time it needs to send and Recieve a Package
    public void CheckRPCSpeedAndReturnValues() {
        ArrayList<String> data = new ArrayList<>();
        Runnable simple = () -> startRPCserver();
        new Thread(simple).start();

        rpcWork rpc = new rpcWork(0, "localhost", 4444);

        rpc.BuildConnection();

        rpc.InitializeRPC();

        long startTime = System.currentTimeMillis();

        data = rpc.SendRpc();

        long stopTime = System.currentTimeMillis();

        System.out.println(stopTime - startTime + " Mili Seconds For RPC to send and Recieve a message back");

        /*
            On pass means that the message send in the PAckage was equal to the amount of data we recieved!.
         */
        assertEquals(rpc.pack.Messeges.size(), data.size());
    }

    public void startRPCserver() {
        try {
            rpcTESThandler handler = new rpcTESThandler();
            History.Processor processor = new History.Processor(handler);
            TServerTransport serverTransport = new TServerSocket(4444);
            TServer server = new TSimpleServer(new TServer.Args(serverTransport).processor(processor));
            server.serve();
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }

}