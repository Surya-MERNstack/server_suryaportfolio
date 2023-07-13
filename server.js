const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(cors())

require("dotenv").config();
const dburl = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dburl, { useNewUrlParser: true });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connect = mongoose.connection;


try {
  connect.on("open", () => {
    console.log("mongoDb is connected");
  });
} catch (err) {
  console.log("Error", err);
}

const UserDetails = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const TotalDetails = mongoose.model("userdetails", UserDetails);

//Api

app.post("/user", (req, res) => {
  UserName = req.body.UserName;
  phoneNumber = req.body.phoneNumber;
  email = req.body.email;
  subject = req.body.subject;
  message = req.body.message;

  const newUserDetails = new TotalDetails({
    UserName,
    phoneNumber,
    email,
    subject,
    message,
  });

  newUserDetails
    .save()
    .then(() => {
      res.status(200).json(newUserDetails);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error", err });
    });
});


app.get('/user', (req, res) => {
    TotalDetails.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error' , error});
      });
  });

app.use((req, res) => {
  res.send("<h1>Hello Nodejs</h1>");
});

app.listen(port, () => {
  console.log(`server is running in the http://localhost:${port}`);
});
