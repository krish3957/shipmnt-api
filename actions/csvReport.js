const road = require("../models/road");

const getReport = async (req, res) => {
    try {
        const roads = await road.find();

        let csvContent = "start_location_id,end_location_id,distance,traffic_condition\n";

        roads.forEach(road => {
            csvContent += `${road.start_location_id},${road.end_location_id},${road.distance},${road.traffic_condition}\n`;
        });

    } catch (error) {
        console.error('Error generating traffic report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = router;
