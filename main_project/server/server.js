const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { busRoute, landmarks, heatmapData, vehicles } = require('./data');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server default port
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic Hello World endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Prayagraj Transport Server!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes for static data
app.get('/api/routes', (req, res) => {
  res.json({
    success: true,
    data: {
      routeName: "Prayagraj Junction - Civil Lines",
      coordinates: busRoute,
      totalStops: busRoute.length,
      description: "Main bus route connecting Prayagraj Junction to Civil Lines via major landmarks"
    }
  });
});

app.get('/api/landmarks', (req, res) => {
  res.json({
    success: true,
    data: landmarks
  });
});

app.get('/api/heatmap', (req, res) => {
  res.json({
    success: true,
    data: heatmapData
  });
});

app.get('/api/vehicles', (req, res) => {
  res.json({
    success: true,
    data: vehicles
  });
});

// Vehicle simulation variables
let activeVehicles = [...vehicles];
let simulationInterval;

// Vehicle manager function
function updateVehiclePositions() {
  activeVehicles.forEach(vehicle => {
    // Move vehicle along the route
    vehicle.currentPosition += vehicle.speed;
    
    // Reset to beginning when reaching end
    if (vehicle.currentPosition >= busRoute.length) {
      vehicle.currentPosition = 0;
    }
    
    // Update passenger count randomly
    const passengerChange = Math.floor(Math.random() * 10) - 5; // -5 to +5
    vehicle.passengers = Math.max(0, Math.min(vehicle.capacity, vehicle.passengers + passengerChange));
  });
  
  // Emit updated vehicle positions to all connected clients
  io.emit('vehiclesUpdate', {
    vehicles: activeVehicles.map(vehicle => ({
      ...vehicle,
      coordinates: busRoute[vehicle.currentPosition]
    }))
  });
}

// Start vehicle simulation
function startVehicleSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }
  
  simulationInterval = setInterval(updateVehiclePositions, 2000); // Update every 2 seconds
  console.log('🚌 Vehicle simulation started - updating every 2 seconds');
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send initial vehicle data to new client
  socket.emit('vehiclesUpdate', {
    vehicles: activeVehicles.map(vehicle => ({
      ...vehicle,
      coordinates: busRoute[vehicle.currentPosition]
    }))
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
  
  // Handle simulation control
  socket.on('startSimulation', () => {
    startVehicleSimulation();
  });
  
  socket.on('stopSimulation', () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      console.log('🚌 Vehicle simulation stopped');
    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚌 Prayagraj Transport Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🗺️  Routes API: http://localhost:${PORT}/api/routes`);
  console.log(`🏛️  Landmarks API: http://localhost:${PORT}/api/landmarks`);
  console.log(`🔥 Heatmap API: http://localhost:${PORT}/api/heatmap`);
  console.log(`🚌 Vehicles API: http://localhost:${PORT}/api/vehicles`);
  console.log(`🌐 Socket.io ready for real-time updates`);
  console.log(`🎮 Vehicle simulation ready - use 'startSimulation' event to begin`);
}); 