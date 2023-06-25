// Import the Seller model
const AddSellerModel = require('../../model/Admin/Add-seller-model');
const { format } = require('date-fns');

// Function to handle adding a new seller
const AddSellerControl = async (req, res) => {
  try {
    // Create a new seller object using the request body
    const newSeller = new AddSellerModel(req.body);

    // Set the registeredDate to the current date
    newSeller.registerdDate = new Date();

    // Save the new seller to the database
    const savedSeller = await newSeller.save();

    // Retrieve the updated seller list from the database
    const sellerList = await AddSellerModel.find();

    // Return the saved seller and the updated seller list as the response
    res.status(201).json({ savedSeller, sellerList });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error adding seller:', error);
    res.status(500).json({ error: 'Failed to add seller' });
  }
};

// Function to handle retrieving the seller list
const getSellerList = async (req, res) => {
  try {
    AddSellerModel.find()
    .then((sellers) => {
      res.json(sellers);
    })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error retrieving seller list:', error);
    res.status(500).json({ error: 'Failed to retrieve seller list' });
  }
};

module.exports = {
  AddSellerControl,
  getSellerList,
};
