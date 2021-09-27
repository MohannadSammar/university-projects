package com.Central;

import com.rpc.Controler;
import org.apache.thrift.TException;

public class rpcTESThandler implements Controler.Iface {
    @Override
    public String Control(int ID, String Message) throws TException {
        String returns = "Send ID was " + ID + " Message was " + Message;
        return returns;
    }
}
