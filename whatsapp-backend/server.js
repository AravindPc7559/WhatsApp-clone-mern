import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors'

//app config
const app = express();
const port = process.env.PORT || 9000;
const connection_URL =
  "mongodb+srv://admin:admin123@whatsapp.kgov2.mongodb.net/Dbwhatsapp?retryWrites=true&w=majority";

const pusher = new Pusher({
  appId: "1301055",
  key: "a3511be92b176b556ab1",
  secret: "a8c918a18bd5a8c9710a",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection

db.once("open",() => {
    console.log('Db is Connected');

    const msgCollection  = db.collection("messagecontents");
    const changeStream = msgCollection.watch()

    changeStream.on("change",(change) => {
        console.log("A Change Occured",change);


        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp:messageDetails.timeStamp,
                received: messageDetails.received,
            })
        } else {
            console.log("Error Triggering Pusher");
        }
    })
})

//middleware
app.use(express.json());
app.use(cors())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

//Db Config
mongoose.connect(connection_URL);

//???

//api router

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen

app.listen(port, () => console.log(`server is running on ${port}`));
