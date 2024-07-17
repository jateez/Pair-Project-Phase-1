const express = require('express');
const app = express();
const port = 3003;
const router = require("./routes/index.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`App is running on localhost on port ${port}...`)
})