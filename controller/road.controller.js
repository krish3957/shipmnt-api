const road = require("../models/road");

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

const getAllRoads = async (req, res) => {
    try {
        const roads = road.find();
        return res.status(200).json(roads);
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

const getTrafficCondition = async (req, res) => {
    const { id } = req.params;
    try {
        const givenRoad = road.findById(id);
        let cond = "Clear";
        if (givenRoad.traffic_condition === 1) {
            cond = "Clear";
        }
        else if (givenRoad.traffic_condition === 5) {
            cond = "Moderate";
        }
        else {
            cond = "heavy"
        }

        return res.status()
    }
    catch (err) {
        console.log(err);
        return res.send(500).send({ message: "Internal Server Error" });
    }
}


module.exports = { addRoad, updateTrafficCond, getAllRoads, getTrafficCondition }