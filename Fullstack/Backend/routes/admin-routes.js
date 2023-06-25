const express = require('express');
const {
  signup,
  login,
  verifyToken,
  getAdmin,
  refreshToken,
  logout,
} = require('../controllers/admin-controller');

const adminrouter = express.Router();

adminrouter.post('/admin/signup', signup);
adminrouter.post('/admin/login', login);
adminrouter.get('/admin', verifyToken, getAdmin);
adminrouter.get('/refresh', refreshToken, verifyToken, getAdmin);
adminrouter.post('/logout', verifyToken, logout);
module.exports = adminrouter;
