// src/services/mqttClient.js
import mqtt from 'mqtt';

const MQTT_BROKER = import.meta.env.VITE_MQTT_BROKER; // ✅ from .env
const MQTT_USERNAME = import.meta.env.VITE_MQTT_USERNAME;
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;

const options = {
  username: MQTT_USERNAME, // ✅ replace with your MQTT username
  password: MQTT_PASSWORD, // ✅ replace with your MQTT password
  clientId: 'react-client-' + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 5000,
};

const mqttClient = mqtt.connect(MQTT_BROKER, options);

mqttClient.on('connect', () => {
  console.log('✅ Connected to MQTT broker');
});

mqttClient.on('error', (err) => {
  console.error('❌ MQTT connection error:', err);
});

export default mqttClient;
