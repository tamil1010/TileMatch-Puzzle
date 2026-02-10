const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const playerRoutes = require("./routes/player");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/arena");

app.use("/admin", adminRoutes);
app.use("/player", playerRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
