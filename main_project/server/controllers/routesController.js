const BusRoute = require('../models/BusRoute');

// POST /routes - Add new route with buses and stops
async function createRoute(req, res) {
  try {
    const payload = req.body;
    if (!payload || !payload.route_id || !payload.route_name) {
      return res.status(400).json({ success: false, message: 'route_id and route_name are required' });
    }

    const created = await BusRoute.create(payload);
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Route with this route_id already exists' });
    }
    console.error('[createRoute] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// GET /routes - Fetch all routes with buses and schedules
async function getRoutes(req, res) {
  try {
    const routes = await BusRoute.find({}).lean();
    return res.json({ success: true, data: routes });
  } catch (error) {
    console.error('[getRoutes] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// GET /routes/:route_id - Fetch single route details
async function getRouteById(req, res) {
  try {
    const { route_id } = req.params;
    const route = await BusRoute.findOne({ route_id }).lean();
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.json({ success: true, data: route });
  } catch (error) {
    console.error('[getRouteById] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// POST /routes/:route_id/buses - Add new bus to a route
async function addBusToRoute(req, res) {
  try {
    const { route_id } = req.params;
    const bus = req.body;
    if (!bus || !bus.bus_id || !bus.bus_number) {
      return res.status(400).json({ success: false, message: 'bus_id and bus_number are required' });
    }

    const exists = await BusRoute.findOne({ 'buses.bus_id': bus.bus_id }).lean();
    if (exists) return res.status(409).json({ success: false, message: 'Bus with this bus_id already exists' });

    const updated = await BusRoute.findOneAndUpdate(
      { route_id },
      { $push: { buses: bus } },
      { new: true }
    ).lean();

    if (!updated) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.status(201).json({ success: true, data: updated });
  } catch (error) {
    console.error('[addBusToRoute] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// PUT /buses/:bus_id - Update bus schedule/crowd pattern
async function updateBus(req, res) {
  try {
    const { bus_id } = req.params;
    const update = req.body || {};

    const routeDoc = await BusRoute.findOne({ 'buses.bus_id': bus_id });
    if (!routeDoc) return res.status(404).json({ success: false, message: 'Bus not found' });

    const busIndex = routeDoc.buses.findIndex((b) => b.bus_id === bus_id);
    if (busIndex === -1) return res.status(404).json({ success: false, message: 'Bus not found' });

    // Perform shallow merge for provided fields
    routeDoc.buses[busIndex] = {
      ...routeDoc.buses[busIndex].toObject(),
      ...update,
    };

    await routeDoc.save();
    return res.json({ success: true, data: routeDoc.toObject() });
  } catch (error) {
    console.error('[updateBus] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// DELETE /buses/:bus_id - Remove a bus
async function deleteBus(req, res) {
  try {
    const { bus_id } = req.params;
    const updated = await BusRoute.findOneAndUpdate(
      { 'buses.bus_id': bus_id },
      { $pull: { buses: { bus_id } } },
      { new: true }
    ).lean();

    if (!updated) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error('[deleteBus] error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  addBusToRoute,
  updateBus,
  deleteBus,
};


