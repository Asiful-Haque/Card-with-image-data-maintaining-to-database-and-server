const registerSchemaModel = require("../model/registrationSchema.js");

exports.registerUser = async (req, res) => {
    try {
        // Create a new registration entry
        const newRegistration = new registerSchemaModel({
            name: req.body.name,
            id: req.body.id,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });

        // Save the registration entry to MongoDB
        await newRegistration.save();

        // Respond with a success message
        res.json({ message: "Registration data saved successfully" });
    } catch (error) {
        console.error("Error saving registration data:", error);
        res.status(500).json({ error: "Failed to save registration data" });
    }
};

exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await registerSchemaModel.find();
        res.json(registrations);
        //console.log(registrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
};