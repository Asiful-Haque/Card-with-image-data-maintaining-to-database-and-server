const express = require("express");
const registerRoutes = require("./routes/registerRoute.js");
const connectDb = require("./model/db.js");

const app = express();
const PORT = 8005;

//connecting database
connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use(registerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
