require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { client } = require('./controllers/client');
const { checkAuth } = require('./controllers/users/users');
const { createUsersRoutes } = require('./routes/users');
const { createTasksRoutes } = require('./routes/tasks');
const { createShoppingItemsRoutes, createShoppingIndredientsRoutes, createShoppingLocationsRoutes } = require('./routes/shopping');

const app = express();

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({credentials: true, origin: process.env.ORIGIN }));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensure secure is set to true for HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined, // Required for cross-origin cookies
    httpOnly: true, // Prevents JavaScript from accessing the cookie
   }
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(checkAuth);

createUsersRoutes(app);
createTasksRoutes(app);
createShoppingItemsRoutes(app);
createShoppingIndredientsRoutes(app);
createShoppingLocationsRoutes(app);

if (process.env.NODE_ENV === 'production') {
  const https = require('https');
  const fs = require('fs');

  const privateKey  = fs.readFileSync(process.env.PRIVATEKEY, 'utf8');
  const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');

  const credentials = {key: privateKey, cert: certificate};

  app.set('trust proxy', 1);
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(3000, () => {
    console.log('Server running on port 3000');
  });
} else {
  app.listen(3000, () => {
    console.log('Server running in development mode on port 3000');
  });
}