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

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String,
        },
    ],
});

const User = new mongoose.model("User", userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter",
    });
    u.address.push({
        street: "123 Sesame Street",
        city: "New York",
        state: "NY",
        country: "USA",
    });
    const res = await u.save();
    console.log(res);
};

makeUser();
