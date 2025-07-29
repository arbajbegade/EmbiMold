import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mqttClient from '../../../services/mqttClient';
import DataChart from './chart';
import DetailsTable from './table';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import MachinePlanEdit from './edit';

const MoldDetails = () => {
  const { id } = useParams();
  const [prodHistory, setProdHistory] = useState({});
  const [rejectionHistory, setRejectionHistory] = useState({});
  const [allDetails, setAllDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

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
        const topicParts = incomingTopic.split("/");
        if (topicParts.length < 5) return;

        const mainKey = topicParts[4];        // e.g. "plan", "OEE", "mold"
        const subKey = topicParts[5];         // e.g. "target", "availability" (optional)

        setAllDetails((prevDetails) => {
          const updated = { ...prevDetails };

          if (!updated[mainKey]) {
            updated[mainKey] = {};
          }

          if (subKey) {
            // If subKey exists, assign payload to that subKey
            updated[mainKey][subKey] = payload;
          } else {
            // No subKey, directly assign the payload to mainKey
            updated[mainKey] = payload;
          }

          return updated;
        });

        if (incomingTopic.endsWith('/production/prod_history')) {
          setProdHistory(payload);
        } else if (incomingTopic.endsWith('/production/rejection_history')) {
          setRejectionHistory(payload);
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold mb-4">Machine Name: {id}</h2>
        <button className='Cbutton' onClick={handleDialogOpen}> <EditIcon /> Edit</button>
      </div>
      <DetailsTable data={allDetails} />
      <DataChart rejectionHistory={rejectionHistory} prodHistory={prodHistory} />

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Machine Details</DialogTitle>
        <DialogContent>
          <MachinePlanEdit data={allDetails} id={id}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoldDetails;
