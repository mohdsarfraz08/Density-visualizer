// Prayagraj Public Transport Data
// Hardcoded coordinates for MVP demonstration

// Major bus route coordinates (Prayagraj to Civil Lines via main roads)
const busRoute = [
  [25.4358, 81.8463], // Prayagraj Junction Railway Station
  [25.4365, 81.8472], // Near Railway Station
  [25.4378, 81.8489], // Civil Lines Road
  [25.4389, 81.8501], // Civil Lines Crossing
  [25.4402, 81.8515], // Near High Court
  [25.4415, 81.8528], // Civil Lines Market
  [25.4428, 81.8541], // Near Anand Bhavan
  [25.4441, 81.8554], // Civil Lines Chowk
  [25.4454, 81.8567], // Near Sangam
  [25.4467, 81.8580], // Sangam Area
  [25.4480, 81.8593], // Near Triveni Sangam
  [25.4493, 81.8606], // Triveni Sangam
  [25.4506, 81.8619], // Near Hanuman Mandir
  [25.4519, 81.8632], // Hanuman Mandir
  [25.4532, 81.8645], // Near Akshay Vat
  [25.4545, 81.8658], // Akshay Vat
  [25.4558, 81.8671], // Near Saraswati Ghat
  [25.4571, 81.8684], // Saraswati Ghat
  [25.4584, 81.8697], // Near Dashashwamedh Ghat
  [25.4597, 81.8710], // Dashashwamedh Ghat
  [25.4610, 81.8723], // Near Manikarnika Ghat
  [25.4623, 81.8736], // Manikarnika Ghat
  [25.4636, 81.8749], // Near Assi Ghat
  [25.4649, 81.8762], // Assi Ghat
  [25.4662, 81.8775], // Near Tulsi Ghat
  [25.4675, 81.8788], // Tulsi Ghat
  [25.4688, 81.8801], // Near Raj Ghat
  [25.4701, 81.8814], // Raj Ghat
  [25.4714, 81.8827], // Near Shivala Ghat
  [25.4727, 81.8840], // Shivala Ghat
  [25.4740, 81.8853], // Near Daraganj
  [25.4753, 81.8866], // Daraganj
  [25.4766, 81.8879], // Near Kydganj
  [25.4779, 81.8892], // Kydganj
  [25.4792, 81.8905], // Near Katra
  [25.4805, 81.8918], // Katra
  [25.4818, 81.8931], // Near Chowk
  [25.4831, 81.8944], // Chowk
  [25.4844, 81.8957], // Near Civil Lines
  [25.4857, 81.8970]  // Civil Lines Final Stop
];

// Key landmarks in Prayagraj
const landmarks = [
  {
    id: 1,
    name: "Prayagraj Junction Railway Station",
    coordinates: [25.4358, 81.8463],
    type: "transport",
    description: "Main railway station of Prayagraj"
  },
  {
    id: 2,
    name: "Triveni Sangam",
    coordinates: [25.4493, 81.8606],
    type: "religious",
    description: "Confluence of three rivers - Ganga, Yamuna, and Saraswati"
  },
  {
    id: 3,
    name: "Anand Bhavan",
    coordinates: [25.4428, 81.8541],
    type: "historical",
    description: "Ancestral home of the Nehru family"
  },
  {
    id: 4,
    name: "High Court",
    coordinates: [25.4402, 81.8515],
    type: "government",
    description: "Allahabad High Court"
  },
  {
    id: 5,
    name: "Dashashwamedh Ghat",
    coordinates: [25.4597, 81.8710],
    type: "religious",
    description: "Famous ghat for Ganga Aarti"
  },
  {
    id: 6,
    name: "Civil Lines Market",
    coordinates: [25.4415, 81.8528],
    type: "commercial",
    description: "Main shopping area in Civil Lines"
  }
];

// Heatmap data for crowd density (simulated)
const heatmapData = [
  // High density areas (red)
  { lat: 25.4493, lng: 81.8606, intensity: 0.9 }, // Triveni Sangam
  { lat: 25.4597, lng: 81.8710, intensity: 0.8 }, // Dashashwamedh Ghat
  { lat: 25.4415, lng: 81.8528, intensity: 0.7 }, // Civil Lines Market
  { lat: 25.4358, lng: 81.8463, intensity: 0.6 }, // Railway Station
  
  // Medium density areas (yellow)
  { lat: 25.4428, lng: 81.8541, intensity: 0.5 }, // Anand Bhavan
  { lat: 25.4402, lng: 81.8515, intensity: 0.4 }, // High Court
  { lat: 25.4545, lng: 81.8658, intensity: 0.4 }, // Akshay Vat
  { lat: 25.4571, lng: 81.8684, intensity: 0.3 }, // Saraswati Ghat
  
  // Low density areas (green)
  { lat: 25.4519, lng: 81.8632, intensity: 0.2 }, // Hanuman Mandir
  { lat: 25.4649, lng: 81.8762, intensity: 0.2 }, // Assi Ghat
  { lat: 25.4675, lng: 81.8788, intensity: 0.1 }, // Tulsi Ghat
  { lat: 25.4831, lng: 81.8944, intensity: 0.1 }, // Chowk
];

// Vehicle simulation data
const vehicles = [
  {
    id: "bus_001",
    type: "bus",
    route: "Prayagraj Junction - Civil Lines",
    currentPosition: 0, // Index in busRoute array
    capacity: 50,
    passengers: 35,
    speed: 1 // Positions per update
  },
  {
    id: "bus_002", 
    type: "bus",
    route: "Prayagraj Junction - Civil Lines",
    currentPosition: 15,
    capacity: 50,
    passengers: 42,
    speed: 1
  },
  {
    id: "bus_003",
    type: "bus", 
    route: "Prayagraj Junction - Civil Lines",
    currentPosition: 8,
    capacity: 50,
    passengers: 28,
    speed: 1
  }
];

module.exports = {
  busRoute,
  landmarks,
  heatmapData,
  vehicles
};
