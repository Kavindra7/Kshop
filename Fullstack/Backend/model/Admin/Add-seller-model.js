const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  registerdDate: {
    type: Date,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

const AddSellerModel = mongoose.model('AddSeller', sellerSchema);

module.exports = AddSellerModel;
