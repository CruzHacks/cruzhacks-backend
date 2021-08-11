const functions = require("firebase-functions");
const express = require("express");
const app = express();
const { auth, requiresAuth } = require("express-openid-connect");
const { config, checkAuthenticated } = require("./controllers/Auth0/token-create.ts");

app.listen(3000);
app.use(auth(config));
app.get("/", checkAuthenticated);

app.get("/private", requiresAuth(), (req, res) => {
  // route that should require Auth
  res.send("Hello private");
});

app.get("/public", (req, res) => {
  // route that shouldn't require Auth
  res.send("Hello public");
});

exports.checkAuthenticated = functions.https.onRequest(checkAuthenticated);
