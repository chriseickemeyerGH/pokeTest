require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const session = require("express-session");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const admin = require("firebase-admin");
const FirestoreStore = require("firestore-store")(session);

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url
  }),
  databaseURL: process.env.DB
});

const database = firebase.firestore();

app.use(
  session({
    store: new FirestoreStore({
      database: database
    }),

    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 120 * 30
    }
  })
);

const { gameStart } = require(`${__dirname}/gameStart`);
const { answerSubmit } = require(`${__dirname}/answerSubmit`);
const { timeOut } = require(`${__dirname}/timeOut`);

app.use(express.static(`${__dirname}/../build/index.html`));

app.post("/gamestart", gameStart);
app.post("/answersubmit", answerSubmit);
app.get("/timeout", timeOut);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

//**development
/*
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
*/
// **now deployment
app.listen();
