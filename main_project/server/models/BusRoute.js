const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema(
  {
    stop_id: { type: String, required: true },
    stop_name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const ScheduleEntrySchema = new mongoose.Schema(
  {
    stop_id: { type: String, required: true },
    arrival_time: { type: String, required: true },
    departure_time: { type: String, required: true },
  },
  { _id: false }
);

const BusSchema = new mongoose.Schema(
  {
    bus_id: { type: String, required: true, index: true, unique: true },
    bus_number: { type: String, required: true },
    schedule: { type: [ScheduleEntrySchema], default: [] },
    crowd_pattern: {
      morning: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      midday: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      evening: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    },
  },
  { _id: false }
);

const BusRouteSchema = new mongoose.Schema(
  {
    route_id: { type: String, required: true, index: true, unique: true },
    route_name: { type: String, required: true },
    stops: { type: [StopSchema], default: [] },
    buses: { type: [BusSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusRoute', BusRouteSchema);


