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

project/\
├── client/ # React frontend \
│ ├── src/\
│ └── ...\
│\
├── server/ # Node.js backend\
│ ├── server.js\
│ ├── data.js\
│ └── ...


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
