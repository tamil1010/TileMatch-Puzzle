const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", require("./routes/admin"));
app.use("/player", require("./routes/player"));

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/TileMatch")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
