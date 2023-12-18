const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Body parser middleware
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/ugmc-emr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const patientsRoutes = require('./routes/patients');
app.use('/api/patients', patientsRoutes); 
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




const Patient = require('./patientModel');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Patient } = require('./models');
const faker = require('faker');


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ugmc-emr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/patients/register', async (req, res) => {
  try {
   
    const randomPatient = {
      patientId: faker.random.uuid(),
      surname: faker.name.lastName(),
      otherNames: faker.name.firstName(),
      gender: faker.random.arrayElement(['Male', 'Female']),
      phoneNumber: faker.phone.phoneNumber(),
      residentialAddress: faker.address.streetAddress(),
      emergencyContact: {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        relationship: faker.random.arrayElement(['Family', 'Friend'])
      }
    };

  
    const newPatient = new Patient(randomPatient);


    const savedPatient = await newPatient.save();

    
    res.status(201).json({ message: 'Patient registered successfully', patient: savedPatient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



const encounterSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  dateAndTime: { type: Date, default: Date.now },
  type: { type: String, enum: ['Emergency', 'OPD', 'Specialist Care'], required: true }
});

const vitalsSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: String, required: true },
  pulse: { type: String, required: true },
  spO2: { type: String, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);
const Encounter = mongoose.model('Encounter', encounterSchema);
const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = { Patient, Encounter, Vitals };

module.exports = mongoose.model('Patient', patientSchema);


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Patient } = require('./models'); 

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/ugmc-emr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/patients/register', async (req, res) => {
  try {
    const {
      patientId,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyContact
    } = req.body;

    const newPatient = new Patient({
      patientId,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyContact
    });

    const savedPatient = await newPatient.save();

 
    res.status(201).json(savedPatient); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



aconst { Patient, Encounter } = require('./patientModel'); // Assuming patientModel.js defines the Patient and Encounter models

app.post('/api/patients/:patientId/encounter', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    
    // Find the patient by ID
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

   
    const { dateAndTime, type } = req.body;

   
    const encounter = new Encounter({
      patientId,
      dateAndTime,
      type
    });

    const savedEncounter = await encounter.save();

    
    res.status(201).json(savedEncounter); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const { Patient, Vitals } = require('./patientModel');

app.post('/api/patients/:patientId/vitals', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const { bloodPressure, temperature, pulse, spO2 } = req.body;
    const vitals = new Vitals({
      patientId,
      bloodPressure,
      temperature,
      pulse,
      spO2
    });

    const savedVitals = await vitals.save();
    res.status(201).json(savedVitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  

app.get('/api/patients', async (req, res) => {
    try {
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

app.get('/api/patients/:patientId', async (req, res) => {
    try {
      // Find and return details of the specified patient
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
