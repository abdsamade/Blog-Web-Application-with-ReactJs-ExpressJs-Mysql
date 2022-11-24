const express = require('express');
const { login, signup, logout } = require('../controllers/Auth');

const route= express.Router();

route.post('/login',login);
route.post('/signup',signup);
route.post('/logout',logout);


export default route;