const { sendShecduledEmail } = require('../actions/sendShecduledEmail');
const email = require('../models/email');

const sheduleEmail = async (req, res) => {
    const { from, to, subject, text, scheduleTime, scheduleType, attachment } = req.body;
    try {
        const newEmail = new email({
            from,
            to,
            subject,
            text,
            scheduleTime,
            sheduleDay,
            sheduleDate,
            scheduleType,
            attachment
        });
        await newEmail.save();

        await sendShecduledEmail(newEmail);

        return res.status(201).json(newEmail);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const retrieveMails = async (req, res) => {
    try {
        const emails = await email.find();
        return res.status(200).json(emails);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const retrieveEmailDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const emailDetails = await email.findById(id);
        return res.status(200).json(emailDetails);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteShedules = (req, res) => {
    const { id } = req.params;
    try {
        email.findByIdAndDelete(id);
        return res.status(200).json({ message: "Email deleted successfully" });
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


module.exports = { sheduleEmail, retrieveMails, retrieveEmailDetails, deleteShedules }