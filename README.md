# Prayagraj Public Transport & Crowd Density Visualizer

A real-time (simulated) map application to visualize bus routes, moving vehicles, and crowd density in Prayagraj, India.

---

## 🚀 Features
- **React + Leaflet** frontend for interactive map display.
- **Express + Socket.io** backend to simulate vehicle movement.
- Static route & landmark data (hardcoded for MVP).
- Real-time vehicle position updates via WebSocket.
- Heatmap visualization for crowd density.

---

## 📂 Project Structure

Density-visualizer/ \
├── main_project/ \
│   ├── client/          # React frontend (Vite) \
│   │   ├── src/ \
│   │   │   ├── App.jsx  # Main React component (currently default Vite template) \
│   │   │   ├── main.jsx # React entry point \
│   │   │   └── *.css    # Styling files \
│   │   └── package.json # Frontend dependencies \
│   └── server/          # Node.js backend \
│       ├── server.js    # Express + Socket.io server \
│       ├── data.js      # Hardcoded Prayagraj data \
│       └── test-api.js  # API testing utility \

---

## 🛠 Tech Stack
**Frontend:**
- React (Vite)
- Leaflet & React-Leaflet
- Socket.io-client

**Backend:**
- Node.js
- Express
- Socket.io
- CORS

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mohdsarfraz08/Density-visualizer.git
cd Density-visualizer
