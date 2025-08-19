
---

# 🚍 **MVP Phase (PraYaan) – Detailed Plan**

### 🎯 **MVP Goal**

To create a **web app** where a user can:

1. Open a city map.
2. Share their **current location** (if they allow).
3. Enter a **destination**.
4. Get **bus route options** with:

   * Travel time (via Google Maps API).
   * Estimated crowd density (from DB rules).
   * Better alternative suggestions (less crowd or faster).

---

## 🔹 Step 1 – Requirement & Data Setup

* **City Bus Data**

  * Collect official bus routes, stops, and schedules.
  * If no API is available → manually hardcode into DB.
  * Example:

    ```json
    {
      "bus_id": "12A",
      "stops": ["Stop1", "Stop2", "Stop3", "Stop4"],
      "start_time": "06:00",
      "end_time": "22:00",
      "frequency": "15 mins"
    }
    ```

* **Crowd Density Rules**

  * Morning (7–10 AM): High
  * Afternoon (12–4 PM): Medium
  * Evening (5–9 PM): High
  * Night (9–12 AM): Low
  * Special crowd zones (markets, stations) → always high

---

## 🔹 Step 2 – Database Design

**Tables (MongoDB or SQL)**

* **Users**

  * `id`, `name`, `email`, `location_permission`, `favorites`

* **Buses**

  * `bus_id`, `route_no`, `start_time`, `end_time`, `frequency`

* **Stops**

  * `stop_id`, `stop_name`, `location (lat,lng)`

* **Routes**

  * `route_id`, `bus_id`, `stop_order`, `stop_id`

* **CrowdDensity**

  * `stop_id`, `time_slot`, `day`, `crowd_level (Low/Medium/High)`

---

## 🔹 Step 3 – Frontend (React.js)

**Landing Page**

* Header → “PraYaan – Smart Bus Route Guide”
* City map (Google Maps API).
* Button: “📍 Use My Location” (Geolocation API).
* Input: “Where do you want to go?”
* Search button.

**Results Page**

* List of possible routes:

  * Route Card → (Bus No, Time to Reach, Crowd Level).
  * Example:

    ```
    🚌 Bus 12A | ETA: 35 mins | Crowd: High 🔴
    🚌 Bus 8B  | ETA: 40 mins | Crowd: Medium 🟡
    ✅ Suggested Alternative: Bus 8B (Less crowd, 5 min slower)
    ```

* Map highlights route with stops.

---

## 🔹 Step 4 – Backend (Node.js + Express)

**APIs Needed**

1. `/api/getRoutes?from=lat,lng&to=lat,lng`

   * Fetch possible bus routes.
   * Integrate **Google Maps Directions API** for timing.
   * Add crowd density data from DB.

2. `/api/getCrowd?stop_id&time`

   * Return Low/Medium/High crowd level.

3. `/api/saveUserLocation`

   * Store location if user gives permission (optional).

---

## 🔹 Step 5 – Google Maps Integration

* Use **Directions API** → Get time & route.
* Use **Traffic Layer** → Show congestion.
* Overlay **our crowd density data** on top.

---

## 🔹 Step 6 – MVP Testing & Validation

* Test with **one city only** (say Ranchi/Patna/Bangalore).
* Hardcode 5–10 main routes.
* Validate crowd rules with **ground surveys**.
* Show both **fastest route** and **least crowded route**.

---

## 🔹 MVP Deliverable

✅ A working **web app** where:

* User opens → sees city map.
* User selects destination → system suggests bus routes.
* Each bus route shows:

  * **ETA (time)** from Google Maps.
  * **Crowd density** from DB rules.
  * **Alternative suggestion** (if slower but less crowded).

---

📌 This MVP will let you **demo** the core concept without needing live sensors or real-time bus data.

---

