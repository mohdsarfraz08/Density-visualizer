# Project Roadmap: Prayagraj Public Transport & Crowd Density Visualizer
*Deadline:* August 19, 2025  
*Strategy:* Build a *Minimum Viable Product (MVP)* first. Prioritize *speed* and *visual impact* by hardcoding all data. The goal is a *demonstrable concept*, not a production-ready system.

---

## 📌 Quick Navigation
- [Day 0 – Environment Setup & Project Scaffolding](#day-0-friday-aug-8-environment-setup--project-scaffolding)
- [Days 1-2 – The Static World](#days-1-2-sat-aug-9---sun-aug-10-the-static-world)
- [Days 3-4 – Backend in Motion](#days-3-4-mon-aug-11---tue-aug-12-backend-in-motion)
- [Days 5-6 – Real-time Frontend](#days-5-6-wed-aug-13---thu-aug-14-real-time-frontend)
- [Days 7-8 – Visual Polish & Heatmap](#days-7-8-fri-aug-15---sat-aug-16-visual-polish--heatmap)
- [Day 9 – Deployment](#day-9-sun-aug-17-deployment)
- [Days 10-11 – Final Polish & Presentation Prep](#days-10-11-mon-aug-18---tue-aug-19-final-polish--presentation-prep)

---

## Day 0 (Friday, Aug 8): Environment Setup & Project Scaffolding
*Goal:* Have a running "Hello World" for both the frontend and backend.

- [ ] *Task 1:* Install Node.js and Git on all team members' machines.  
- [ ] *Task 2:* Create a central GitHub repository and add all team members as collaborators.  
- [ ] *Task 3:* Create main project folder with:
  - client (frontend)
  - server (backend)  
- [ ] *Task 4:* Initialize Frontend  
  - cd client  
  - npm create vite@latest . -- --template react  
  - npm install  
  - npm install leaflet react-leaflet  
  - npm run dev → verify page works  
- [ ] *Task 5:* Initialize Backend  
  - cd server  
  - npm init -y  
  - npm install express cors socket.io  
  - Create server.js with a basic Express server  

---

## Days 1-2 (Sat, Aug 9 - Sun, Aug 10): The Static World
*Goal:* Display a map of Prayagraj with one static bus route and key landmarks.

- [ ] *Task 1 (Frontend):* Render full-screen map using react-leaflet.  
- [ ] *Task 2 (Data):* Trace *one major route* (20–30 coordinates) + *4-5 landmarks* from Google Maps.  
- [ ] *Task 3 (Backend):* Hardcode coordinates in server/data.js.  
- [ ] *Task 4 (Backend):* Create static API endpoints:
  - /api/routes
  - /api/landmarks  
- [ ] *Task 5 (Frontend):* Fetch and draw route (<Polyline>) + landmarks (<Marker>).  

✅ *Checkpoint (Sun Night):* Map with a colored line + landmark icons visible.

---

## Days 3-4 (Mon, Aug 11 - Tue, Aug 12): Backend in Motion
*Goal:* Simulate moving vehicles on backend.

- [ ] *Task 1:* Create "vehicle manager" script to track active vehicles.  
- [ ] *Task 2:* Integrate socket.io into Express server.  
- [ ] *Task 3:* Create setInterval loop to update positions every 2 seconds.  
- [ ] *Task 4:* Emit updated positions via vehiclesUpdate event.  

✅ *Checkpoint (Tue Night):* Backend simulates vehicle movement & broadcasts updates.

---

## Days 5-6 (Wed, Aug 13 - Thu, Aug 14): Real-time Frontend
*Goal:* Display moving vehicle icons on the map.

- [ ] *Task 1:* npm install socket.io-client in frontend.  
- [ ] *Task 2:* Connect frontend to backend’s socket.io server.  
- [ ] *Task 3:* Listen for vehiclesUpdate → update state array.  
- [ ] *Task 4:* Map over array to render <Marker> for each vehicle.  

✅ *Checkpoint (Thu Night):* Vehicles smoothly moving on map.

---

## Days 7-8 (Fri, Aug 15 - Sat, Aug 16): Visual Polish & Heatmap
*Goal:* Add heatmap and improve UI.

- [ ] *Task 1 (Backend):* Hardcode heatmap data in data.js + API /api/heatmap.  
- [ ] *Task 2 (Frontend):* Render heatmap using react-leaflet-heatmap-layer-v3.  
- [ ] *Task 3 (Frontend):* Add header + legend. Apply clean CSS styling.  

✅ *Checkpoint (Sat Night):* Dashboard-style look with heatmap.

---

## Day 9 (Sun, Aug 17): Deployment
*Goal:* Deploy app online.

- [ ] *Task 1:* Create accounts on *Vercel* (frontend) & *Render.com* (backend).  
- [ ] *Task 2:* Deploy backend to Render.  
- [ ] *Task 3:* Deploy frontend to Vercel.  
- [ ] *Task 4:* Update API/socket URLs → redeploy frontend.  

✅ *Checkpoint (Sun Night):* Public URL available for demo.

---

## Days 10-11 (Mon, Aug 18 - Tue, Aug 19): Final Polish & Presentation Prep
*Goal:* Prepare final product & presentation.

- [ ] *Task 1 (Mon):* Fix bugs, add comments, write README.md.  
- [ ] *Task 2 (Mon Night):* Rehearse presentation (problem → solution → demo → tech stack → future scope).  
- [ ] *Task 3 (Tue):* Have live URL ready + local backup.  

---