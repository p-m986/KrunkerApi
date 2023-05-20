const express = require("express");
const router = express.Router();

// Importing middleware
const { fetchuser } = require("../Middleware/fetchuser");


// Test route for the file
router.get("/test", (req, res) => {
    res.status(200).send("Test route /api/test is working successfully");
})


// Route to just fetch the data from user profile nessary for verification
router.get("/fetch", fetchuser, async (req, res) => {
    try {
        res.status(200).json(req.body.data);
        res.end();
    }
    catch (err) {
        req.body.data.hasError = true;
        req.body.data.error = err.message;
        res.status(500).json(req.body.data);
    }
})


module.exports = router;