package com.Participant;

import com.google.gson.annotations.Expose;

public class Consumer extends Participant {
    @Expose
    public double consumptionRate;

    public Consumer() {
        id = idCounter++;
        identifier = "consumer";
        consumptionRate = (int) ((Math.random() * (20 - 10)) + 10);
        currentEnergyAmount = 0;
    }

    @Override
    public void Work() {
        if (currentEnergyAmount >= consumptionRate) {
            currentEnergyAmount -= consumptionRate;
            energyHistory += consumptionRate;

            try {
                Thread.sleep((int) ((Math.random() * (8000 - 1000)) + 1000));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            for (Participant e : Main.participants) {
                if (!(e instanceof Producer)) continue;
                double request = 0;
                if (e.lock.tryLock()) {
                    request = ((Producer) e).TakeEnergy(consumptionRate);
                    e.lock.unlock();
                }

                if (Math.abs(request) > 0.001) {
                    AddEnergy(request);
                    break;
                }
            }
        }
    }

    public void AddEnergy(double Add) {
        currentEnergyAmount += Add;
        //new Thread(Main::SendJson).start();
    }
}
