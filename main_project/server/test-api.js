const http = require('http');

const baseURL = 'http://localhost:3001';

function testEndpoint(path, description) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${baseURL}${path}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${description}: ${res.statusCode}`);
          console.log(`   Data: ${JSON.stringify(jsonData, null, 2).substring(0, 200)}...`);
          resolve(jsonData);
        } catch (error) {
          console.log(`❌ ${description}: Failed to parse JSON`);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ ${description}: ${error.message}`);
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      console.log(`❌ ${description}: Timeout`);
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Prayagraj Transport Server API Endpoints\n');
  
  try {
    await testEndpoint('/health', 'Health Check');
    await testEndpoint('/api/routes', 'Routes API');
    await testEndpoint('/api/landmarks', 'Landmarks API');
    await testEndpoint('/api/heatmap', 'Heatmap API');
    await testEndpoint('/api/vehicles', 'Vehicles API');
    
    console.log('\n🎉 All API endpoints are working correctly!');
    console.log('\n📋 Available endpoints:');
    console.log('   GET /health - Server health check');
    console.log('   GET /api/routes - Bus route coordinates');
    console.log('   GET /api/landmarks - Key landmarks in Prayagraj');
    console.log('   GET /api/heatmap - Crowd density heatmap data');
    console.log('   GET /api/vehicles - Current vehicle positions');
    console.log('\n🌐 Socket.io events:');
    console.log('   vehiclesUpdate - Real-time vehicle position updates');
    console.log('   startSimulation - Start vehicle simulation');
    console.log('   stopSimulation - Stop vehicle simulation');
    
  } catch (error) {
    console.log('\n❌ Some tests failed. Make sure the server is running on port 3001');
  }
}

runTests();
