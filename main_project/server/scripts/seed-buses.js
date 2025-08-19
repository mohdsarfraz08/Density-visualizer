const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { connectToDatabase } = require('../config/db');
const BusRoute = require('../models/BusRoute');

async function run() {
  try {
    await connectToDatabase();

    const filePath = process.argv[2] || path.join(process.cwd(), 'buses.json');
    if (!fs.existsSync(filePath)) {
      console.error(`[seed-buses] File not found: ${filePath}`);
      process.exit(1);
    }

    const fileRaw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(fileRaw);

    if (!Array.isArray(json)) {
      console.error('[seed-buses] Expected an array of routes in JSON.');
      process.exit(1);
    }

    let upserted = 0;
    for (const route of json) {
      if (!route.route_id || !route.route_name) {
        console.warn(`[seed-buses] Skipping invalid route entry (missing route_id/route_name)`);
        continue;
      }

      const result = await BusRoute.findOneAndUpdate(
        { route_id: route.route_id },
        { $set: route },
        { new: true, upsert: true }
      );
      if (result) upserted += 1;
    }

    console.log(`[seed-buses] Upserted ${upserted} routes.`);
    process.exit(0);
  } catch (error) {
    console.error('[seed-buses] Error:', error);
    process.exit(1);
  }
}

run();


