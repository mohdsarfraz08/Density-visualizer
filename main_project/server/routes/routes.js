const express = require('express');
const router = express.Router();

const {
  createRoute,
  getRoutes,
  getRouteById,
  addBusToRoute,
  updateBus,
  deleteBus,
} = require('../controllers/routesController');

// Routes CRUD
router.post('/routes', createRoute);
router.get('/routes', getRoutes);
router.get('/routes/:route_id', getRouteById);
router.post('/routes/:route_id/buses', addBusToRoute);

// Buses updates
router.put('/buses/:bus_id', updateBus);
router.delete('/buses/:bus_id', deleteBus);

module.exports = router;


