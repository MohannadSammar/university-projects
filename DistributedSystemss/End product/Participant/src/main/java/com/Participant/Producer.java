package com.Participant;

import com.google.gson.annotations.Expose;

import java.time.LocalTime;
import java.util.Random;

public class Producer extends Participant {
    public enum ProductionType {
        SUN,
        WIND,
        COAL
    }

    @Expose
    public ProductionType typeOfEnergy;
    @Expose
    public double energyCreationRate;
    @Expose
    public double maxCapacity;
    @Expose
    public boolean producingEnergy = true;
    @Expose
    public float maintenanceRequired = 0;

    public boolean doubleTime = false;

    public boolean specialConditions = false;

    public boolean maintenance = false;

    public Producer() {
        id = idCounter++;
        identifier = "producer";
        typeOfEnergy = ProductionType.values()[(int) (Math.random() * ProductionType.values().length)];
        energyCreationRate = (int) ((Math.random() * (40 - 20)) + 20);
        maxCapacity = energyCreationRate * (int) ((Math.random() * (4 - 2)) + 2);
        currentEnergyAmount = 0;
    }

    @Override
    public void Work() {
        if (!producingEnergy || specialConditions || maintenance) {
            if (typeOfEnergy.toString() == "WIND") {
                SpecialEnergyConditions();
            }
            return;
        }

        if (currentEnergyAmount < maxCapacity) {
            try {
                Thread.sleep((long) ((Math.random() * (8000 - 1000)) + 1000));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            if (!SpecialEnergyConditions()) {
                lock.lock();
                if (doubleTime) {
                    currentEnergyAmount += energyCreationRate * 2;
                    energyHistory += energyCreationRate * 2;
                } else {
                    currentEnergyAmount += energyCreationRate;
                    energyHistory += energyCreationRate;
                }
                if (currentEnergyAmount > maxCapacity) {
                    currentEnergyAmount = maxCapacity;
                }
                lock.unlock();

                //new Thread(Main::SendJson).start();

                maintenanceRequired += new Random().nextFloat() * (0.3 - 0.1);
            }

            if (maintenanceRequired >= 0.7) {
                doubleTime = false;
                producingEnergy = false;
                maintenance = true;

                try {
                    BeingFixed();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private boolean SpecialEnergyConditions() {
        switch (typeOfEnergy) {
            case SUN:
                // Kann abends/nachts nicht produzieren
                if (LocalTime.now().getHour() > 18 || LocalTime.now().getHour() < 6) {
                    specialConditions = true;
                    producingEnergy = false;
                    doubleTime = false;
                    return true;
                }
                producingEnergy = true;

                specialConditions = false;
                break;
            case WIND:
                // Wind zwischen 0 und 1, unter 0.2 wird nicht mehr produziert
                if ((new Random().nextDouble() + new Random().nextDouble()) / 2 <= 0.5) {
                    specialConditions = true;
                    producingEnergy = false;
                    doubleTime = false;

                    return true;
                }

                producingEnergy = true;
                specialConditions = false;
                break;
            case COAL:
                break;
        }
        return false;
    }

    private void BeingFixed() throws InterruptedException {
        long sleepTime = (long) ((Math.random() * (20000 - 10000)) + 10000);
        System.out.println("Erzeuger mit der ID: " + this.id + "; Typ: " + this.typeOfEnergy + " wird repariert! Reparierzeit: " + sleepTime / 1000 + " Sekunden.");
        Thread.sleep(sleepTime);
        maintenanceRequired = 0;
        maintenance = false;
        producingEnergy = true;
    }

    public double TakeEnergy(double request) {
        if (request <= currentEnergyAmount) {
            currentEnergyAmount -= request;

            if (currentEnergyAmount > 0) {
                int add = (int) (currentEnergyAmount / 4);
                request += add;
                currentEnergyAmount -= add;
            }

            return request;
        }

        return 0;
    }
}
