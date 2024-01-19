/** @format */

const express = require("express");
const routes = express.Router();
const mongoclient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");
const cors = require("cors");
routes.use(cors());
routes.use(express.json());
routes.use(bodyParser.urlencoded({ extended: false }));

var project;

routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

routes.post("/subToStudent",(req,res)=>{
    console.log(req.body.rollno,req.body.subject)
    let subs = req.body.subject; 
    student.collection(req.body.dept+"").updateOne(
        { Rollno: req.body.rollno },
            { $set: { [`subjects.${req.body.subject}`]: [0,0,0,0] } },
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            console.log("Subject added to student:", result);
            res.status(200).json({ message: "Subject added successfully" });
        }
    );

})
routes.post("/suballStudent",(req,res)=>{
    console.log(req.body.rollno,req.body.subject)
    let subs = req.body.subject; 
    student.collection(req.body.dept).updateMany(
        { dept: req.body.dept },
            { $set: { [`subjects.${req.body.subject}`]: [0,0,0,0] } },
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            console.log("Subject added to student:", result);
            res.status(200).json({ message: "Subject added successfully" });
        }
    );
})
routes.post("/fetchSubStudent",(req,res)=>{
    console.log(req.body.subject)
})

mongoclient.connect(
    "mongodb://0.0.0.0:27017/",
    { useNewUrlParser: true },
    (err, result) => {
        if (err) throw err;
        project = result.db("LandT");
        student =result.db("student")
        console.log("Sucessfully connected with student management MongoDB . . .");
    }
    );
module.exports = routes;
