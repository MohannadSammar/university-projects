package com.ExternalClient;

import com.rpc.History;
import com.rpc.Package;
import org.apache.thrift.TException;

public class rpcTESThandler implements History.Iface {
    @Override
    public Package getHistory(int Start) throws TException {

        Package pack = new Package();
        for (int i = 0; i < 10; i++) {
            pack.Messeges.add("msg");
        }
        pack.Lastint = 10;
        return pack;
    }
}
