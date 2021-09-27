package com.Central;

import com.RPChandlers.RPCClient;
import com.rpc.Controler;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;
import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RPCClientTest {
    @Test
    void CheckIfExpectedArgumentsAreAlsoSent() {
        RPCClient.MaximumCapacity = new HashMap<>();
        RPCClient.EnergyAmount = new HashMap<>();
        RPCClient.MaximumCapacity.put(1, 25);
        RPCClient.EnergyAmount.put(1, 25);

        Runnable simple = () -> startRPCserver();
        new Thread(simple).start();

        RPCClient.setupRPC("localhost", 4444);
        long startTime = System.currentTimeMillis();

        RPCClient.RPCFunction();

        long stopTime = System.currentTimeMillis();

        System.out.println(stopTime - startTime + " Mili Seconds For the function to Reconcognize What to do and  send and Recieve a RPC message ");

        /*
        on Pass, means that Because ID 1 had full energy (Max = Energyamount) A message was sent to STOP that Producer.
        That was done by sending an RPC message that containes the ID and the Message. STOP/PRODUCE/DOUBLETIME .
        */
        assertEquals(RPCClient.status, "Send ID was " + "1" + " Message was " + "STOP");

    }

    public void startRPCserver() {
        try {
            rpcTESThandler handler = new rpcTESThandler();
            Controler.Processor processor = new Controler.Processor(handler);
            TServerTransport serverTransport = new TServerSocket(4444);
            TServer server = new TSimpleServer(new TServer.Args(serverTransport).processor(processor));
            server.serve();
        } catch (TTransportException e) {
            e.printStackTrace();
        }
    }
}