const mongoose = require("mongoose");

// Define a schema for storing registration data
const RegistrationSchema = new mongoose.Schema({
    name: String,
    id: String,
    image: { data: Buffer, contentType: String },
});
const Registration = mongoose.model("Registration-collections", RegistrationSchema);

module.exports = Registration;