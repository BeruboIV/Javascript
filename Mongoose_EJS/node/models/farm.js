const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongoose Database Connected");
    })
    .catch((err) => {
        console.log("Oh No Mongo Connection Error!!");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"],
    },
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Product = new mongoose.model("Product", productSchema);
const Farm = new mongoose.model("Farm", farmSchema);

Farm.findOne({ name: "Full Belly Farms" })
    .populate("products")
    .then((farm) => console.log(farm));

// Product.insertMany([
//     { name: "Melon", price: 4.99, season: "Summer" },
//     { name: "Water Melon", price: 5.99, season: "Summer" },
//     { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

// const makeFarm = async () => {
//     const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//     const melon = await Product.findOne({ name: "Melon" });
//     farm.products.push(melon);
//     farm.save();
//     console.log(farm);
//     console.log("Melon id : ", melon._id);
// };

// makeFarm();

// const addProduct = async () => {
//     const farm = await Farm.findOne({ name: "Full Belly Farms" });
//     const watermelon = await Product.findOne({ name: "Water Melon" });
//     farm.products.push(watermelon);
//     await farm.save();
//     console.log(farm);
//     console.log("watermelon id : ", watermelon._id);
// };

// addProduct();
