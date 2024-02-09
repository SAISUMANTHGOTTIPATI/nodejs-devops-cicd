require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const port = 3001; 

// Configure MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Endpoint 1: Return a simple string
app.get('/api1', (req, res) => {
  res.send('OK from API1');
});

// Endpoint 2: Connect to MySQL and return the database name
app.get('/api1/db', (req, res) => {
  connection.query('SELECT DATABASE()', (error, results) => {
    if (error) throw error;
    res.send(`OK from API1 DB: ${results[0]['DATABASE()']}`);
  });
});

// Endpoint 3: Make a request to the /api2 endpoint of the second API and return its response
app.get('/api1/api2', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API2_BASE_URL}/api2`);
    res.send(`OK from API1 and ${response.data}`);
  } catch (error) {
    res.send(`Error calling API2: ${error.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
