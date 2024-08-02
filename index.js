const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailRoute = require('./routes/email.route');
const { addRoad, updateTrafficCond } = require('./controller/road.controller');
const { addLocation } = require("./controller/location.controller");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://krish3957:krish3957@shipmnts-task.dt1ooyx.mongodb.net/?retryWrites=true&w=majority&appName=shipmnts-task");

mongoose.connection.on('connected', () => {
    console.log('Database is connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Database is disconnected');
});

app.use("/email", emailRoute);

app.post("/locations", addLocation)
app.post("/roads", addRoad);
app.post("/traffic-updates", updateTrafficCond);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
