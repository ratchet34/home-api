require('dotenv').config();

const express = require('express');
const https = require('https');
const fs = require('fs');
const privateKey  = fs.readFileSync(process.env.PRIVATEKEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');
const cors = require('cors');
const session = require('express-session');
const { client } = require('./controllers/client');
const { checkAuth } = require('./controllers/users/users');
const { createUsersRoutes } = require('./routes/users');
const { createTasksRoutes } = require('./routes/tasks');
const { createShoppingItemsRoutes, createShoppingIndredientsRoutes, createShoppingLocationsRoutes } = require('./routes/shopping');

const credentials = {key: privateKey, cert: certificate};
const app = express();

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({credentials: true, origin: process.env.ORIGIN }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Ensure secure is set to true for HTTPS
    sameSite: 'none', // Required for cross-origin cookies
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

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
  console.log('Server running on port 3000');
});