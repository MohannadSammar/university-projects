package com.Participant;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RPChandlerTest {
    @Test
    void FunctionalityTestForRPCMessages() {
        RPChandler rp = new RPChandler();
        Producer pr = new Producer();
        String msg = rp.MessageIsStop(pr.id, "STOP", " ", pr);

        assertFalse(pr.producingEnergy);

        msg = rp.MessageIsStop(pr.id, "STOP", " ", pr);

        assertEquals(msg, "STOP" + " " + pr.id + " Already stopped");

        msg = rp.MessageIsDoubletime(pr.id, "DOUBLETIME", " ", pr);

        assertTrue(pr.doubleTime);
        assertTrue(pr.producingEnergy);

        assertEquals(msg, "DOUBLETIME" + " " + pr.id + " success");

        rp.MessageIsStop(pr.id, "STOP", " ", pr);

        msg = rp.MessageIsProduce(pr.id, "PRODUCE", " ", pr);

        assertTrue(pr.producingEnergy);

    }
}