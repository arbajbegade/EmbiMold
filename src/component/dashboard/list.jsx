import React, { useEffect, useState } from "react";
import mqttClient from "../../services/mqttClient";
import secureApiFetch from "../../services/apiFetch";
import DashBoardDetails from "./details";

const Dashboard = () => {
  const [allDetails, setAllDetails] = useState([]);
const [isMachinesLoaded, setIsMachinesLoaded] = useState(false);
  // Initialize all machines with default values
  useEffect(() => {
    secureApiFetch("/api/v1/machine-names", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const initialDetails = data.map((machine) => ({
          "machine name": machine.machine_name,
          "status": "offline",
          "ps number": "",
          "target": 0,
          "actual": 0,
          "rejected": 0,
          "shift_target": 0,
          "shift_actual": 0,
          "shift_rejected": 0,
          "shift_start": "",
          "shift_end": "",
          "connection_status": 0,
          "prod_history": {},
          "rejection_history": {}
        }));

        setAllDetails(initialDetails);
        setIsMachinesLoaded(true);
      })
      .catch((error) => {
        console.error("Machine name fetch error:", error);
      });
  }, []);

  // Handle incoming MQTT messages
  useEffect(() => {
     if (!isMachinesLoaded) return;
    const topic = `premierseals/#`;

    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("❌ MQTT subscription failed:", err);
      } else {
        console.log(`✅ Subscribed to topic: ${topic}`);
      }
    });

    const handleMessage = (incomingTopic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        const topicParts = incomingTopic.split("/");
        const machineName = topicParts[3];
        setAllDetails((prevDetails) => {
          const index = prevDetails.findIndex(
            (machine) => machine["machine name"] === machineName
          );
          if (index === -1) return prevDetails;
          const updatedMachine = { ...prevDetails[index] };

          if (topicParts[4] === "mold") {
            updatedMachine["ps number"] = payload.ps_no || "";
          }
          if (topicParts[4] === "status") {
            updatedMachine["status"] = payload.status || "offline";
          }
          if (topicParts[4] === "connection" && topicParts[5] === 'status') {
            updatedMachine["connection_status"] = payload.connected || 0;
          }
          if (topicParts[5] === "target") {
            updatedMachine["shift_target"] = payload.shift_target || 0;
            updatedMachine["target"] = payload.plan_target || 0;
          }
          if (topicParts[5] === "actual") {
            updatedMachine["shift_actual"] = payload.shift_actual || 0;
            updatedMachine["actual"] = payload.plan_actual || 0;
          }
          if (topicParts[5] === "rejected") {
            updatedMachine["shift_rejected"] = payload.shift_rejected || 0;
            updatedMachine["rejected"] = payload.plan_rejected || 0;
          }

          if (topicParts[5] === "prod_history") {
            updatedMachine["prod_history"] = {
              ...(updatedMachine["prod_history"] || {}),
              ...payload,
            };
          }
          if (topicParts[5] === "rejection_history") {
            updatedMachine["rejection_history"] = {
              ...(updatedMachine["rejection_history"] || {}),
              ...payload,
            };
          }
          // Create a new array with updated machine
          const updatedArray = [...prevDetails];
          updatedArray[index] = updatedMachine;
          return updatedArray;
        });
      } catch (error) {
        console.error("❌ Error parsing MQTT message:", error);
      }
    };

    mqttClient.on("message", handleMessage);

    return () => {
      mqttClient.unsubscribe(topic, () => {
        console.log(`🧹 Unsubscribed from: ${topic}`);
      });
      mqttClient.removeListener("message", handleMessage);
    };
  }, [isMachinesLoaded]);
  return (
    <div className="my-2 pt-4 w-full h-full p-2 bg-white rounded-md shadow-lg">
      <DashBoardDetails allDetails={allDetails} />
    </div>
  );
};

export default Dashboard;
