const express = require('express');
const cors = require('cors');
require("dotenv").config;

// Importing Routes
const verification = require("./Routes/verification");

// Creating the express application
const app = express()

// Prebuilt Middlewares to be used for the application
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Route for fetching the user details and also for the user verifications
app.use("/api", verification);


// Test route for the verification of the api working properly
app.get("/", (req, res) => {
    try {
        console.log("Keep-alive port accessed");
        res.status(200).send("API is up and running");
    }
    catch (err) {
        res.status(500).send("Some error occoured");
    }
})


// Boradcasting the api over the server at port 443 commonly used port for https requests
app.listen(5000, () => { //Use env to hide port
    console.log("Sever has started")
})

module.exports = app;
