import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mqttClient from '../../../services/mqttClient';
import DataChart from './chart';
import DetailsTable from './table';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import MachinePlanEdit from './edit';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import EditIcon from '@mui/icons-material/Edit';
import CavityEdit from './CavityEdit';
import OeeData from './OeeData';


const MoldDetails = () => {
  const { id } = useParams();
  const [prodHistory, setProdHistory] = useState({});
  const [rejectionHistory, setRejectionHistory] = useState({});
  const [allDetails, setAllDetails] = useState([]);
  const [moldStatus, setMoldStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            updated[mainKey][subKey] = payload;
          } else {
            updated[mainKey] = payload;
          }
          return updated;
        });
        if (incomingTopic.endsWith('/machine/mold')) {
          setMoldStatus(payload.status || "CLOSED");
        }
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
        <div className='flex items-center gap-4'>
          <button className='Cbutton' onClick={handleOpen}> <EditIcon /> Change Working Cavity</button>
          <button className='Cbutton' onClick={handleDialogOpen}> <EditIcon /> Edit</button>
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <DetailsTable data={allDetails} moldStatus={moldStatus} />
      </div>

      <DataChart rejectionHistory={rejectionHistory} prodHistory={prodHistory} />

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Machine Details</DialogTitle>
        <DialogContent>
          <MachinePlanEdit data={allDetails} id={id} />
        </DialogContent>
      </Dialog>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Working Cavity</DialogTitle>
        <DialogContent>
          <CavityEdit data={allDetails.mold} id={id} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoldDetails;
