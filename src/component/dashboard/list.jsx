import React, { useEffect, useState } from "react";
import mqttClient from "../../services/mqttClient";
import secureApiFetch from "../../services/apiFetch";
import DashBoardDetails from "./details";

const Dashboard = () => {
  const [allDetails, setAllDetails] = useState([]);
  const [prodHistory, setProdHistory] = useState({});
  const [rejectionHistory, setRejectionHistory] = useState({});

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
          "shift start": "",
          "shift end": "",
          "connection status": "offline",
          "prod_history": {},
          "rejection_history": {}
        }));

        setAllDetails(initialDetails);
      })
      .catch((error) => {
        console.error("Machine name fetch error:", error);
      });
  }, []);

  // Handle incoming MQTT messages
  useEffect(() => {
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
        const dataType = topicParts[5]; // e.g., "target", "actual", "rejected"
        setAllDetails((prevDetails) => {
          const index = prevDetails.findIndex(
            (machine) => machine["machine name"] === machineName
          );
          if (index === -1) return prevDetails;

          const updatedMachine = { ...prevDetails[index] };

          if (dataType === "target") {
            updatedMachine["target"] = payload.target || 0;
            updatedMachine["ps number"] = payload.ps_no || "";
            updatedMachine["connection status"] = "online";
          } else if (dataType === "actual") {
            updatedMachine["actual"] = payload.actual || 0;
            updatedMachine["connection status"] = "online";
          } else if (dataType === "rejected") {
            updatedMachine["rejected"] = payload.rejected || 0;
            updatedMachine["connection status"] = "online";
          } else if (topicParts[4] === "status") {
            updatedMachine["status"] = payload.status || "online";
            updatedMachine["connection status"] = "online";
          }
          if (dataType === "prod_history") {
            updatedMachine["prod_history"] = {
              ...(updatedMachine["prod_history"] || {}),
              ...payload,
            };
          }
          if (dataType === "rejection_history") {
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
  }, []);
  return (
    <div className="my-2 pt-4 w-full h-full p-2 bg-white rounded-md shadow-lg">
      <DashBoardDetails allDetails={allDetails} />
    </div>
  );
};

export default Dashboard;
