const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');

const PORT = config.PORT;

// ---- Connect to mongodb here ----

// --- connect to your collection ---

// Handle data in a nice way
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// Set your static html file
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html"))
});

// ---- ADD YOUR API ENDPOINTS HERE ----
// GET: "api/v1/database"
app.get("/api/v1/database", async(req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// POST: "api/v1/database"
app.post("/api/v1/database", async(req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// PUT: "api/v1/database:id"
app.put("/api/v1/database/:id", async(req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// DELETE: "api/v1/database:id"
app.delete("/api/v1/database/:id", async(req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// Start listening
app.listen(PORT, () => {
    console.log(`see the magic: http://localhost:${PORT}`);
})