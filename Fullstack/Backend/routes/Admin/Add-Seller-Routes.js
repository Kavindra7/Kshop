const express = require('express');
const AddSellerRoutes = express.Router();
const { AddSellerControl, getSellerList } = require('../../controllers/Admin/Add-seller-control');

// POST route for adding a new seller
AddSellerRoutes.post('/admin/sellerlist/addseller', AddSellerControl);



// GET route for retrieving the seller list
AddSellerRoutes.get('/admin/sellerlist', getSellerList);

module.exports = AddSellerRoutes;
