const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
mongoose
    .connect("mongodb://localhost:27017/APP", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongoose Connection Open!");
    })
    .catch((err) => {
        console.log("Mongoose Connection Error");
    });

//MidlleWares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const productSchema = new mongoose.Schema({
    energy_use: String,
    electricity: String,
    natural_gas: String,
    oil: String,
    lpg: String,
});

const Product = mongoose.model("ENERGY", productSchema);

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/item", async (req, res) => {
    const products = await Product.find({});
    res.render("item", { products });
});

app.post("/additem", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("update", { product });
});

app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    // const product = await Product.findById(id);
    res.redirect("/item");
});

app.listen(3000, () => {
    console.log("Listening at PORT 3000....");
});
