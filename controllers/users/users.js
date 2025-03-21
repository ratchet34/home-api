const { client } = require('../client');

const checkLogin = async (username, password) => {
  const user = await client.db('home').collection('users').findOne({ username, password });
  if (user) {
    return user;
  }
  return false;
}

const checkAuth = (req, res, next) => {
  if (req.session.user || req.path === '/users/check-auth' || req.path === '/users/login') {
    next();
  } else {
    res.status(401).send('You are not authorized to perform this request.');
  }
}

const listUsers = async () => {
  const users = await client.db('home').collection('users').find({}).toArray();
  return users;
}

module.exports = { checkLogin, checkAuth, listUsers };