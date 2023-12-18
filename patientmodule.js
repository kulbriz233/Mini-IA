const mongoose = require('mongoose');
const faker = require('faker');

// Define schema for the Patient
const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  otherNames: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phoneNumber: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true }
  }
});

// Create a function to generate random patient data
function generateRandomPatient() {
  return {
    patientId: faker.random.uuid(),
    surname: faker.name.lastName(),
    otherNames: faker.name.firstName(),
    gender: faker.random.arrayElement(['Male', 'Female', 'Other']),
    phoneNumber: faker.phone.phoneNumber(),
    residentialAddress: faker.address.streetAddress(),
    emergencyContact: {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      relationship: faker.random.arrayElement(['Family', 'Friend'])
    }
  };
}

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient, generateRandomPatient };
