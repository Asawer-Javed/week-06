const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Store this in an environment variable

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Example route
app.post('/api/login', (req, res) => {
  // Authenticate user and generate JWT
  const user = { id: 1, username: 'user1' }; // Replace with actual user data
  const accessToken = jwt.sign(user, secretKey);
  res.json({ accessToken });
});

// Protect a route with the middleware
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});