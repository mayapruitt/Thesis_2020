const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
var loaded = 0;

var analysis = require('./compare_functions/requires.js');


const PORT = config.PORT;

// ---- Connect to mongodb here ----
// read in mongoose library
const mongoose = require('mongoose');
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });


// --- connect to your collection ---
const database = require('./models/database');

// Handle data in a nice way
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// static html pages
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html"))
});

app.get("/02_intro", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/02_intro.html"))
})

app.get("/03_create", (req, res) => {
    if (!loaded) {
        analysis.compare.simulateUsers(analysis.listData.lists)
        loaded = 1;
    }
    res.sendFile(path.resolve(__dirname + "/views/03_create.html"))
})

app.get("/04_evaluate", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/04_evaluate.html"))
})

app.get("/05_reflectSame", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/05_reflectSame.html"))
})

app.get("/05_reflectDiff", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/05_reflectDiff.html"))
})

app.get("/index", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html"))
})



// ---- ADD YOUR API ENDPOINTS HERE ----
// GET: "api/v1/database"
app.get("/api/v1/database", async(req, res) => {
    try {
        const data = await database.find();
        res.json(data);
        console.log("displaying all data");
        //analysis.compare.simulateUsers(analysis.listData.lists);

    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// POST: "api/v1/database"
app.post("/api/v1/database", async(req, res) => {
    try {
        const newData = {
            list: req.body.list
        }
        let ret = analysis.compare.pipeline(newData.list);

        // const data = await database.create(newData);
        res.json({
            sim: JSON.stringify(ret[0]),
            diff: JSON.stringify(ret[1])
        });
        analysis.listData.lists.push(newData.list);
        analysis.listData.uData = ret;
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// PUT: "api/v1/database:id"
app.put("/api/v1/database/:id", async(req, res) => {
    try {
        const updatedData = {
            todo: req.body.todo,
            status: req.body.status
        }
        const data = await database.findOneAndUpdate({ _id: req.params.id }, updatedData, { new: true });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.get('/api/v1/database/uLists', (req, res) => {

    let lData = {
        sim: analysis.listData.uData[0],
        diff: analysis.listData.uData[1]
    };

    res.json(lData);

});
// DELETE: "api/v1/database:id"
app.delete('/api/v1/database/:id', async(req, res) => {

    try {
        console.log(req.params.id);
        const deletedDocument = await database.findByIdAndDelete(req.params.id);
        res.json({ "message": "successfully removed item", "data": JSON.stringify(deletedDocument) });
        console.log("delete request received");
    } catch (error) {
        console.log(error);
        res.json({ error: JSON.stringify(error) });
    }
});

// Start listening
app.listen(PORT, () => {
    console.log(`see the magic: http://localhost:${PORT}`);
})