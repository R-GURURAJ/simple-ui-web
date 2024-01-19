const express = require("express");
const routes = express.Router();
const mongoclient = require("mongodb").MongoClient;
const cors = require("cors");

routes.use(cors());
routes.use(express.json());

var groups;
var mainproject;

routes.get("/", (req, res) => {
  res.send("server connected .....");
});

routes.post("/createGroup", (req, res) => {
  console.log("create group entered",req.body.groupName);
  groups.createCollection(req.body.groupName, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(req.body.groupName);
    
    project
      .collection("staff")
      .findOneAndUpdate(
        { uid: req.body.uid },
        { $push: { groups: req.body.groupName } },
        (err) => {
          console.log("entered and begaine..");
          if (err) throw err;
          console.log("sucessfully updated or added ");
        }
      );
  });
});

routes.post("/removeGroups", (req, res) => {
  console.log("create group entered",req.body.grpname,req.body.uid);
  groups.collection(req.body.grpname).drop((err,result) => {
    if (err) {
      res.send(err);
      return;
    }
  })
  project
      .collection("staff")
      .findOneAndUpdate(
        { uid: req.body.uid },
        { $pull: { groups: req.body.grpname } },
        (err) => {
          console.log("entered and begaine..");
          if (err) throw err;
          console.log("sucessfully updated or deleted ");
        }
      );
  });

routes.post("/staffSubject", (req, res) => {
  console.log(req.body.subject)
  project.collection(req.body.roll).findOneAndUpdate({uid:req.body.uid},{$push:{subjects:req.body.subject}},
    (err)=>{
      console.log("Not Added subject");
      if(err) throw err;
      console.log("Sucessfully updated")
    })
})
routes.post("/subAddstaff", (req, res) => {
  const newArray = [...new Set(req.body.subject)];
  console.log(req.body.subject)
  console.log(req.body.year)
  project.collection("staff").updateMany(
   { uid:req.body.uid },
   { $set: { subjects: newArray,AdvisorYear: req.body.year  } },
)
for (const subject of newArray) {
  
  // const collectionName = subject.toLowerCase().replace(/\s+/g, '_');
  // const collection = subjects.collection(subject);

  // collection.createIndex({ id: 1 }, { unique: true });

  // collection.insertOne({ name: subject });
  subjectList.createCollection(subject, (err) => {
    if (err) {
      res.send(err);
      return;
    }
  })
  console.log(`Collection ${subject} created successfully with a unique index on 'name'`);
}
});

routes.post("/removeStaff", (req, res) => {
  // console.log(req.body.subject)
  project
  .collection("staff")
  .deleteOne({ uid: req.body.uid }, (err, result) => {
    if (err) throw err;
    else console.log("removed",req.body.uid)
  });

})

routes.post("/getGroupsData", (req, res) => {
  if(req.body.accounttype=="student"){
    student
    .collection(req.body.dept+"")
    .find({ uid: req.body.uid })
    .toArray((err, result) => {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
  }else{
    project
    .collection(req.body.accounttype+"")
    .find({ uid: req.body.uid })
    .toArray((err, result) => {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
  }
  
});

//Displaying message
routes.post("/clickedGroupDatas", (req, res) => {
  // groups
  //   .collection(req.body.groupName)
  //   .find({})
  //   .toArray((err, result) => {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  groups
    .collection(req.body.groupName)
    .find({}, { projection: { msg: 1, uid: 1, type:1,date:1 } })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });

});

// //insert Message
routes.post("/SendMessage", (req, res) => {
  
  // var name = project
  //   .collection("student")
  //   .find({ uid: req.body.uid });
  // console.log(name);
  // groups
  //   .collection(req.body.groupName)
  //   .insertOne(
  //     { msg: req.body.message, uid: req.body.uid, name: name },
  //     (err) => {
  //       if (err) throw err;
  //       res.send("sucessfully Inserted....");
  //     }
  //   );

  var nameCursor = project
    .collection("student")
    .findOne({ uid: req.body.uid }, (err, name) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      console.log(name);

      groups
        .collection(req.body.groupName)
        .insertOne(
          { msg: req.body.message, uid: req.body.uid, name: name, type: "msg",date:req.body.date },
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Internal Server Error");
            }

            console.log("Inserted successfully");
            res.send("Successfully Inserted....");
          }
        )
    })
});

//display all students
routes.post("/DisplayStudentsList", (req, res) => {
  project
    .collection(req.body.groupName)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
});

routes.post("/checkuser", (req, res) => {
  mainproject
    .collection(req.body.accounttype)
    .find({ uid: req.body.uid })
    .toArray((err, result) => {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
});

routes.post("/addStudentInGroup", (req, res) => {
  console.log("adding student");

  student
    .collection(req.body.dept+"")
    .findOne({ Rollno: req.body.rollno }, (err, result) => {
      console.log(req.body.groupName);
      student
        .collection(req.body.dept+"")
        .updateOne(
          { Rollno: req.body.rollno },
          { $push: { groups: req.body.groupName } },
          (err) => {
            if (err) throw err;
            res.send("Successfully added.");
          }
        );
    });
});

//Adding the groupName to Student
routes.get("/addstudent/:dept/:groupName", (req, res) => {
  project
    .collection(req.params.dept+"")
    .updateMany(
      { dept: req.params.dept },
      { $push: { groups: req.params.groupName } },
      (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("An error occurred during the update operation.");
        } else {
          res.send("Successfully updated or added.");
        }
      }
    );
});


routes.post("/addUsersList", (req, res) => {
  console.log("search for users list");
  student
    .collection(req.body.deptval+"")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});



mongoclient.connect("mongodb://0.0.0.0:27017", (err, result) => {
    if (err) throw err;
    groups = result.db("Groups");
    subjects = result.db("Subjects");
    subjectList = result.db("subjectList");
    student =result.db("student")
    mainproject = result.db("MainProject");
    project = result.db("LandT");
    console.log("Sucessfully connected with Chat MongoDB . . .");
});

module.exports = routes;
