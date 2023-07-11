if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-layouts");

const app = express();
const indexRoute = require("./routes/index");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRoute);

app.listen(3000);
