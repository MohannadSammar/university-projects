package com.Central;

import org.apache.thrift.TException;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

class OtherStationsTest {

    @Test
    void functionalTest() {
        OtherStations otherStations1 = new OtherStations("localhost", 8000);
        otherStations1.BuildConnection();
        otherStations1.InitializeRPC();

        String send = "[{\"consumptionRate\":15.0,\"id\":1,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":12.0,\"id\":2,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":17.0,\"id\":3,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":11.0,\"id\":4,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":16.0,\"id\":5,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"typeOfEnergy\":\"SUN\",\"energyCreationRate\":20.0,\"maxCapacity\":60.0,\"producingEnergy\":true,\"maintenanceRequired\":0.0,\"id\":6,\"identifier\":\"producer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"typeOfEnergy\":\"SUN\",\"energyCreationRate\":28.0,\"maxCapacity\":56.0,\"producingEnergy\":true,\"maintenanceRequired\":0.0,\"id\":7,\"identifier\":\"producer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0}]";
        String message = otherStations1.SendRpc(send);
        System.out.println(message);

        assertEquals(send, otherStations1.SensorData.get(otherStations1.SensorData.size() - 1));
    }

    @Test
    void performanceTest() {
        OtherStations otherStations = new OtherStations("localhost", 8000);
        otherStations.BuildConnection();
        otherStations.InitializeRPC();

        String send = "[{\"consumptionRate\":15.0,\"id\":1,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":12.0,\"id\":2,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":17.0,\"id\":3,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":11.0,\"id\":4,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"consumptionRate\":16.0,\"id\":5,\"identifier\":\"consumer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"typeOfEnergy\":\"SUN\",\"energyCreationRate\":20.0,\"maxCapacity\":60.0,\"producingEnergy\":true,\"maintenanceRequired\":0.0,\"id\":6,\"identifier\":\"producer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0},{\"typeOfEnergy\":\"SUN\",\"energyCreationRate\":28.0,\"maxCapacity\":56.0,\"producingEnergy\":true,\"maintenanceRequired\":0.0,\"id\":7,\"identifier\":\"producer\",\"currentEnergyAmount\":0.0,\"energyHistory\":0.0}]";
        String message;

        long start = System.nanoTime();
        try {
            message = otherStations.SendRpc(send);
            otherStations.SendSensorData(message);
        } catch (TException ignored) {
        }

        long end = System.nanoTime();
        System.out.println(TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
    }
}