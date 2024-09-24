const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/assignment_internshala')
.then(() => console.log('MongoDB connected to assignment_internshala'))
.catch((err) => console.log(err));



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);


app.post('/submit', async (req, res) => {
  const { name, address } = req.body;

  try {
    const newUser = new User({ name });
    const savedUser = await newUser.save();

    const newAddress = new Address({ userId: savedUser._id, address });
    await newAddress.save();

    res.status(201).json({ message: 'User and address saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user and address', error });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
