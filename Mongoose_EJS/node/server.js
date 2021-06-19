const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongoose Connection Open!");
    })
    .catch((err) => {
        console.log("Mongoose Connection Error");
    });

const Test = require("./models/test");

//MidlleWares
// app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    // res.send("Hello");
    res.render("index.ejs");
});

app.post("/data", async (req, res) => {
    const newTest = new Test(req.body);
    console.log(newTest._id);
    await newTest.save();
    res.redirect("/");
});

app.get("/records", async (req, res) => {
    const students = await Test.find({}).where("age").gte(10).lt(20);
    res.render("records", { students });
});

app.listen(3000, () => {
    console.log("Listening at PORT 3000....");
});
