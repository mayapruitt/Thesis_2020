//include node modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//include custom modules
const dbInteraction = require('./custom_modules/dbInteraction');
const nlp = require('./custom_modules/nlp');

//Set up express
const app = express();
const config = require('./config');
const PORT = config.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(`${__dirname}/public`)));

//Set up the database connection
dbInteraction.connect(config.MONGODB_URI);

app.get("/tutorial", async(req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/tutorial.html"))
});



app.get("/experiment", async(req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/experiment.html"))
});

app.get("/react", async(req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/reactTry.html"))
});


//Return the homepage upon initialization
app.get("/", async(req, res) => {
    //Uncomment if the database needs to be reinitialized
    //dbInteraction.queries.deleteAllDictionaryWords();
    //dbInteraction.queries.deleteAllUsers();
    //nlp.pipelines.simulateUsers(nlp.listData.lists);
    res.sendFile(path.resolve(__dirname + "/views/home.html"))
});

//GET
app.get("/api/getList/:id", async(req, res) => {
    try {
        console.log(req.params.id);
        const data = await dbInteraction.queries.getListFromId(req.params.id);
        console.log("displaying all data");
        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

//GET
app.get("/api/getallusers", async(req, res) => {

    try {
        const data = await dbInteraction.queries.getAllUsers();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json(err);
    }

});

app.get("/trials/classification", (req, res) => {

    res.sendFile(path.resolve(__dirname + "/views/classification.html"));

});

app.post("/trials/classification", (req, res) => {

    try {
        const newData = {
            text: req.body.text
        }

        res.json(nlp.pipelines.classificationPipeline(
	    path.resolve(__dirname + "/assets/datasets/"), "itpthesis-pf.tsv", newData));

    } catch (err) {
        console.error(`There was an error! [${err}]`);
        res.json(err);
    }
});



//POST
app.post("/api/parselist", async(req, res) => {
    try {

        const newData = {
            list: req.body.list
        }

        //0: the new database object, 1: most similar list, 2: most different list
        let [newObj, sim, diff] = await nlp.pipelines.userListPipeline(newData.list);

        // const data = await userDatabase.create(newData);
        res.json({
            userObj: JSON.stringify(newObj),
            sim: JSON.stringify(sim),
            diff: JSON.stringify(diff)
        });


    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.post("/api/parsereason", async(req, res) => {
    try {

        const newData = {
            id: req.body.id,
            sim: req.body.sim,
            diff: req.body.diff,
            choice: req.body.choice,
            choiceReason: req.body.choiceReason
        };

        var ret = await dbInteraction.queries.updateUserWithChoice(newData);
	
	res.json(nlp.pipelines.classificationPipeline(
	    path.resolve(__dirname + "/assets/datasets/"), "itpthesis-pf.tsv", newData.choiceReason));
        //res.json("PARSED REASON");

    } catch (error) {
        console.log(error);
        res.json(error);
    }
});


// Start listening
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})
