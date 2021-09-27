package com.Participant;

import com.rpc.Controler;
import org.apache.thrift.TException;

public class RPChandler implements Controler.Iface {
    @Override
    public String Control(int ID, String Message) throws TException {
        String status = "";
        Producer producer = null;
        producer = getProducer(ID, producer);
        status = MessageIsStop(ID, Message, status, producer);
        status = MessageIsProduce(ID, Message, status, producer);
        status = MessageIsDoubletime(ID, Message, status, producer);

        return status;
    }

    public String MessageIsDoubletime(int id, String message, String status, Producer producer) {
        String reason;
        if (message.equals("DOUBLETIME") && producer != null) {
            reason = "Doubletime";
            if (!producer.doubleTime && !producer.maintenance && !producer.specialConditions) {
                if (!producer.producingEnergy) {
                    producer.producingEnergy = true;
                }
                producer.doubleTime = true;
                status = message + " " + id + " success";
            } else {
                if (producer.maintenance) {
                    reason = "Maintenance";
                } else if (producer.specialConditions) {
                    reason += "Special Conditions";
                }
                status = message + " " + id + " Currently unavailable, in: " + reason;
            }
        }
        return status;
    }

    public String MessageIsProduce(int ID, String message, String status, Producer pr) {
        String reason;
        if (message.equals("PRODUCE") && pr != null) {
            reason = "Already Producing";
            if (!pr.producingEnergy && !pr.maintenance && !pr.specialConditions) {
                pr.producingEnergy = true;
                status = message + " " + ID + " success";
            } else {
                if (pr.maintenance) {
                    reason += "Maintence";
                } else if (pr.specialConditions) {
                    reason += "Special Condetions";
                }
                status = message + " " + ID + " Currently unavalible, in:" + reason;
            }
        }
        return status;
    }

    public String MessageIsStop(int ID, String message, String status, Producer pr) {
        if (message.equals("STOP") && pr != null) {
            if (pr.producingEnergy) {
                pr.producingEnergy = false;
                pr.doubleTime = false;
                status = message + " " + ID + " success";
            } else {
                status = message + " " + ID + " Already stopped";
            }
        }
        return status;
    }

    public Producer getProducer(int ID, Producer pr) {
        for (Participant pa : Main.participants) {
            if (pa.id == ID) {
                pr = (Producer) pa;
                break;
            }
        }
        return pr;
    }
}
