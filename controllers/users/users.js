const { client } = require('../client');
const crypto = require('crypto');

const checkLogin = async (username, password) => {
  const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
  const user = await client.db('home').collection('users').findOne({ username, hashedPassword });
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