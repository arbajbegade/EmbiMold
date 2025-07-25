import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mqttClient from '../../../services/mqttClient';
import DataChart from './chart';
import DetailsTable from './table';

const MoldDetails = () => {
  const { id } = useParams();
  const [mqttData, setMqttData] = useState({});
  const [prodHistory, setProdHistory] = useState({});
  const [rejectionHistory, setRejectionHistory] = useState({});
  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {
    const topic = `premierseals/chinchwad/molding/${id}/#`;

    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("❌ MQTT subscription failed:", err);
      } else {
        console.log(`✅ Subscribed to machine: ${topic}`);
      }
    });

    const handleMessage = (incomingTopic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        const parts = incomingTopic.split("/");
        if (parts.length < 6) return;

        const machineName = parts[4]; // e.g., M-50
        const mainKey = parts[5];     // e.g., oee, connection, electricity, machine, mold, plan
        const subKey = parts[6] || null; // e.g., actual/rejected/target for plan, otherwise null

        setAllDetails((prevDetails) => {
          const machineData = { ...prevDetails[machineName] };

          if (mainKey === "plan" && subKey) {
            machineData.plan = {
              ...machineData.plan,
              [subKey]: payload,
            };
          } else {
            machineData[mainKey] = payload;
          }

          return {
            ...prevDetails,
            [machineName]: machineData,
          };
        });

        if (incomingTopic.endsWith('/plan/prod_history')) {
          setProdHistory(payload);
        } else if (incomingTopic.endsWith('/plan/rejection_history')) {
          setRejectionHistory(payload);
        } else if (typeof payload === 'object' && payload !== null) {
          setMqttData(prev => ({ ...prev, ...payload }));
        }

      } catch (error) {
        console.error("❌ Failed to parse MQTT message:", error);
      }
    };

    mqttClient.on("message", handleMessage);

    return () => {
      mqttClient.unsubscribe(topic, () => {
        console.log(`🧹 Unsubscribed from: ${topic}`);
      });
      mqttClient.removeListener("message", handleMessage);
    };
  }, [id]);
  
  return (
    <div className="my-2 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">Machine Name: {id}</h2>
        <DetailsTable data={allDetails} />
      <DataChart rejectionHistory={rejectionHistory} prodHistory={prodHistory} />

    </div>
  );
};

export default MoldDetails;
