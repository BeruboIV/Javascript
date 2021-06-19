const mongoose = require("mongoose");
const Product = require("./models/products");

mongoose
    .connect("mongodb://localhost:27017/farmStand", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!");
    })
    .catch((err) => {
        console.log("MONGO CONNECTION ERROR");
        console.log(err);
    });

// const p = new Product({
//     name: "Grape",
//     price: "1.99",
//     category: "fruit",
// });

// p.save()
//     .then((data) => console.log(data))
//     .catch((e) => console.log(e));

const seedProducts = [
    {
        name: "Eggplant",
        price: 1.0,
        category: "vegetable",
    },
    {
        name: "Melon",
        price: 4.99,
        category: "fruit",
    },
    {
        name: "Watermelon",
        price: 3.99,
        category: "fruit",
    },
    {
        name: "Celery",
        price: 1.5,
        category: "vegetable",
    },
    {
        name: "milk",
        price: 2.69,
        category: "dairy",
    },
];

Product.insertMany(seedProducts)
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err);
    });
