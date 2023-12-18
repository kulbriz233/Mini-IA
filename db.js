// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ugmc-emr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
