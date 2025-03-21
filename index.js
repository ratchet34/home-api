require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { checkAuth } = require('./controllers/users/users');
const { createTasksRoutes } = require('./controllers/tasks/routes');
const { createUsersRoutes } = require('./controllers/users/routes');
const { client } = require('./controllers/client');
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

app.use(checkAuth);

createUsersRoutes(app);
createTasksRoutes(app);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});