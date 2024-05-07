const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/adya', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // You can start using mongoose models here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });