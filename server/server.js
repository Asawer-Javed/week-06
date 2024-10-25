const express = require('express');
const redis = require('redis');
const axios = require('axios');
const helmet = require('helmet');

const app = express();
const port = 5000;

const client = redis.createClient();

client.on('error', (err) => {
  console.log('Redis error: ', err);
});

// Middleware
app.use(helmet());

// Fetch users from an external API and cache the result
app.get('/api/users', async (req, res) => {
  client.get('users', async (err, data) => {
    if (err) throw err;

    if (data) {
      // Return cached data
      return res.json(JSON.parse(data));
    } else {
      // Fetch from external API
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      client.setex('users', 3600, JSON.stringify(response.data)); // Cache for 1 hour
      return res.json(response.data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});