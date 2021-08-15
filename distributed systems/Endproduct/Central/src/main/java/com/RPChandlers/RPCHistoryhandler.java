package com.RPChandlers;

import com.Central.Main;
import com.rpc.History;
import com.rpc.Package;
import org.apache.thrift.TException;

import java.util.ArrayList;


public class RPCHistoryhandler implements History.Iface {

    public final int PACKAGE_AMOUNT = 10;
    ArrayList<String> daten = Main.data;

    public RPCHistoryhandler() {

    }

    @Override
    public Package getHistory(int Start) throws TException {
        Package message = new Package();
        if(!Main.FLAG_FOR_OFFLINE) {
            for (int i = 0; i < PACKAGE_AMOUNT; i++) {
                    if (Start >= daten.size()) {
                        message.Messeges.add("<EOT>");
                        System.out.println(daten.size());
                        System.out.println(Main.data.size());
                        break;
                    }
                    message.Messeges.add(daten.get(Start++));
                }
                message.Lastint = Start;
                return message;

//            message.Messeges.add("Test1");
//            message.Messeges.add("Test2");
//            message.Messeges.add("Test3");
//            message.Messeges.add("<EOT>");
//            message.Lastint = Start;
//            return message;
        }
        message.Messeges.add("wait");
        message.Lastint = Start;
        return message;
    }

}
