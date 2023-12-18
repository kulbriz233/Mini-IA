// Patient model (in a separate file, e.g., patientModel.js)
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // Define schema fields based on requirements
});

module.exports = mongoose.model('Patient', patientSchema);
