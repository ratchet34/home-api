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

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});