const express = require('express');
const app = express();
const port = 3000; 


// Define the /api2 endpoint
app.get('/api2', (req, res) => {
  res.send('OK from API2');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
