const addRoad = async (req, res) => {
    const { name, startLocation, endLocation } = req.body;
    try {
        const newRoad = new road({
            name,
            startLocation,
            endLocation
        });
        await newRoad.save();
        return res.status(201).json(newRoad);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateTrafficCond = (req, res) => {
    const { road_id } = req.params;
    const { traffic_condition } = req.body;
    try {
        const updatedRoad = road.findByIdAndUpdate(road_id,
            { traffic_condition },
            { new: true }
        );
        return res.status(200).json(updatedRoad);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { addRoad, updateTrafficCond }