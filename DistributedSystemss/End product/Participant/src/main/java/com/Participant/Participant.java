package com.Participant;

import com.google.gson.annotations.Expose;

import java.util.concurrent.locks.ReentrantLock;

public abstract class Participant {
    public static int idCounter = 1;

    @Expose
    public int id;
    @Expose
    public String identifier;
    @Expose
    public double currentEnergyAmount;
    @Expose
    public double energyHistory;

    public ReentrantLock lock = new ReentrantLock();

    public abstract void Work();

    @Override
    public String toString() {
        return "Participant{" +
                "id=" + id +
                ", identifier='" + identifier + '\'' +
                ", currentEnergyAmount=" + currentEnergyAmount +
                ", energyHistory=" + energyHistory +
                ", lock=" + lock +
                '}';
    }
}
