const express = require('express');
const app = express();
const port = 3003;
const path = require('path');
const routes = require("./routes/index.js");
const session = require('express-session');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/styles'));
app.use(express.static('public/assets'));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/typewriter-effect/dist')));

// TRY
// app.use(express.json())

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  },
}))

app.use(routes);

app.listen(port, () => {
  console.log(`App is running on localhost on port ${port}...`)
})