const express = require('express');
const cors = require('cors');
// const fs = require('fs');
const multer = require('multer');
// const path = require('path');

const app = express();
const { GridFSBucket } = require('mongodb');
const streamifier = require('streamifier');
const mongoclient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const upload = multer({ storage: multer.memoryStorage() });

app.post('/insertFile', upload.single('file'), (req, res) => {
  console.log('In insert');
  const buffer = req.file.buffer;
  const base64String = buffer.toString('base64');

  const fileName = req.file.originalname;

  console.log('Decrypted');
  groups
    .collection(req.body.groupName)
    .insertOne(
      {
        msg: fileName,
        uid: req.body.uid,
        type: 'file',
        encode: base64String,
        date: req.body.date,
      },
      (err) => {
        if (err) throw err;
        res.send('Successfully Inserted....');
      }
    );
});


app.post('/classInsert', upload.single('file'), (req, res) => {

  try {
    const collectionName = req.body.subject;
    const bucket = new GridFSBucket(subjects, { bucketName: collectionName });
    const readableStream = streamifier.createReadStream(req.file.buffer);
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);
    uploadStream.on('finish', () => {
      console.log(`File uploaded to ${collectionName} successfully`);
      res.send('File uploaded successfully');
    });
  } catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/classGet', async (req, res) => {

  console.log(req.body.subject)
  try {
    const collectionName = req.body.subject;
    const collection = subjects.collection(`${collectionName}.files`); // Assuming "collectionName" is the GridFS bucket name

    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err) {
    console.error('Error retrieving GridFS collection data:', err);
    res.status(500).send('Internal Server Error');
  }
})


app.post('/classDownload', async (req, res) => {
  try {
    const collectionName = req.body.subject;
    const bucket = new GridFSBucket(subjects, { bucketName: collectionName });
    const fileId = req.body.id;
    const downloadStream = bucket.openDownloadStream(ObjectId(fileId));
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
    downloadStream.pipe(res);
    downloadStream.on('end', () => {
      res.end();
    });
  } catch (err) {
    console.error('Error handling file download:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/fileDownload', (req, res) => {
  const subj = req.body.groupName;
  const date = req.body.date;
  var findVal = req.body.id ? ObjectId(req.body.id) : { date };
  groups.collection(subj).findOne({ date: date }, (err, result) => {
    if (err) throw err;
    res.send([result.encode, result.msg]);
  })
})

mongoclient.connect("mongodb://0.0.0.0:27017", (err, result) => {

  if (err) throw err;
  groups = result.db("Groups");
  subjects = result.db("Subjects");
  project = result.db("LandT");
  console.log("Sucessfully connected with File . . .");
});

module.exports = app;
