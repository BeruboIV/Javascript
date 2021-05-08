const express = require("express");
const bodyParser = require("body-parser");
const api = require("./src/api");
const app = express();

// Middlewares
app.use(express.json());
app.use("/api/v1", api.router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}...`);
});
