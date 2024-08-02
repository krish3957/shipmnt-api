const location = require("../models/location");

const addLocation = async (req, res) => {
    const { name, latitude, longitude } = req.body;
    try {
        const newLocation = new location({
            name,
            latitude,
            longitude
        });
        await newLocation.save();
        return res.status(201).json(newLocation);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { addLocation }

