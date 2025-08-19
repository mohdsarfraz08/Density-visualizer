import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'

// Fix for default markers in react-leaflet
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function App() {
  const [routes, setRoutes] = useState(null)
  const [landmarks, setLandmarks] = useState([])
  const [heatmapData, setHeatmapData] = useState([])
  const [showVehicles, setShowVehicles] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Prayagraj center coordinates
  const center = [25.4358, 81.8463]

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Fetch data from backend
    const fetchData = async () => {
      try {
        // Fetch routes
        const routesResponse = await fetch('http://localhost:3001/api/routes')
        const routesData = await routesResponse.json()
        setRoutes(routesData.data)

        // Fetch landmarks
        const landmarksResponse = await fetch('http://localhost:3001/api/landmarks')
        const landmarksData = await landmarksResponse.json()
        setLandmarks(landmarksData.data)

        // Fetch heatmap data
        const heatmapResponse = await fetch('http://localhost:3001/api/heatmap')
        const heatmapData = await heatmapResponse.json()
        setHeatmapData(heatmapData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    return () => clearInterval(timeInterval)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const getCrowdDensityLevel = () => {
    const avgIntensity = heatmapData.reduce((sum, point) => sum + point.intensity, 0) / heatmapData.length
    if (avgIntensity > 0.6) return 'High'
    if (avgIntensity > 0.3) return 'Medium'
    return 'Low'
  }

  return (
    <div className="app">
      {/* Top Header */}
      <header className="header">
        {/* <div className="app-logo">🚌</div> */}
        <div className="header-btn">
        <h1>🚌CityTrack Prayagraj</h1>
        </div>
        <div className="header-center">
          <span className="live-indicator">
            <span className="live-dot"></span>
            {formatTime(currentTime)}
          </span>
        </div>
        <div className="header-right">

          <button className="theme-toggle">Light</button>
        </div>
      </header>

      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="search-section">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search routes or landmarks..." />
            </div>
          </div>

          <div className="legend-section">
            <h3>Legend</h3>
            <div className="legend-item">
              <span className="legend-icon bus-icon">🚌</span>
              <span>Active Buses</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon landmark-icon">📍</span>
              <span>Landmarks</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon density-icon">📊</span>
              <span>Crowd Density</span>
            </div>
            <div className="legend-item">
              <div className="heatmap-scale">
                <div className="scale-item high"></div>
                <div className="scale-item medium"></div>
                <div className="scale-item low"></div>
              </div>
              <span>Heatmap Scale</span>
            </div>
          </div>

          <div className="filters-section">
            <h3>Filters</h3>
            <div className="filter-item">
              <label>Show Vehicles</label>
              <input
                type="checkbox"
                checked={showVehicles}
                onChange={(e) => setShowVehicles(e.target.checked)}
              />
            </div>
            <div className="filter-item">
              <label>Show Heatmap</label>
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
              />
            </div>
          </div>

          <div className="routes-section">
            <h3>Route Status</h3>
            <div className="route-item">
              <span className="route-name">Route 1A</span>
              <span className="status-dot active"></span>
            </div>
            <div className="route-item">
              <span className="route-name">Route 2B</span>
              <span className="status-dot warning"></span>
            </div>
            <div className="route-item">
              <span className="route-name">Route 3C</span>
              <span className="status-dot inactive"></span>
            </div>
            <div className="route-item">
              <span className="route-name">Route 4D</span>
              <span className="status-dot active"></span>
            </div>
          </div>
        </aside>

        {/* Main Map Area */}
        <main className="map-container">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Bus Route */}
            {routes && (
              <Polyline
                positions={routes.coordinates}
                color="#3B82F6"
                weight={4}
                opacity={0.8}
              >
                <Popup>
                  <div>
                    <h3>{routes.routeName}</h3>
                    <p>Total Stops: {routes.totalStops}</p>
                    <p>{routes.description}</p>
                  </div>
                </Popup>
              </Polyline>
            )}

            {/* Landmarks */}
            {landmarks.map((landmark) => (
              <Marker
                key={landmark.id}
                position={landmark.coordinates}
                icon={new Icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <div>
                    <h3>{landmark.name}</h3>
                    <p><strong>Type:</strong> {landmark.type}</p>
                    <p>{landmark.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Heatmap Visualization (simplified) */}
            {showHeatmap && heatmapData.map((point, index) => (
              <Marker
                key={index}
                position={[point.lat, point.lng]}
                icon={new Icon({
                  iconUrl: `data:image/svg+xml;base64,${btoa(`
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" fill="${point.intensity > 0.6 ? '#ef4444' : point.intensity > 0.3 ? '#f59e0b' : '#10b981'}" opacity="0.7"/>
                    </svg>
                  `)}`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10],
                })}
              >
                <Popup>
                  <div>
                    <h3>Crowd Density</h3>
                    <p>Intensity: {(point.intensity * 100).toFixed(0)}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>

        {/* Right Panel - Live Statistics */}
        <aside className="stats-panel">
          <div className="stats-card">
            <div className="stats-header">
              <span className="stats-icon">📊</span>
              <h3>Live Statistics</h3>
              <span className="stats-time">{formatTime(currentTime)}</span>
            </div>

            <div className="stats-content">
              <div className="stat-item">
                <span className="stat-label">Active Buses</span>
                <span className="stat-value">
                  50
                  <span className="stat-trend up">↗</span>
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Crowd Density</span>
                <span className="stat-value warning">{getCrowdDensityLevel()}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Avg Speed</span>
                <span className="stat-value">15 km/h</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">System Online</span>
                <span className="stat-value">
                  <span className="status-dot active"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Bar */}
      <footer className="footer">
        <div className="footer-left">
          <span>© 2024 CityTrack Prayagraj</span>
          <span>Version 2.1.0</span>
          <span>Data updated live</span>
        </div>
        <div className="footer-right">
          <span>Support</span>
          <span>Emergency</span>
          <span>API</span>
          <span>About</span>
          <span className="system-status">
            <span className="status-dot active"></span>
            All Systems Operational
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
