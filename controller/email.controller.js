const email = require('../models/email');

const emailRouter = require('express').Router();

const sheduleEmail = async (req, res) => {
    const { from, to, subject, text, scheduleTime, scheduleType, attachment } = req.body;
    try {
        const newEmail = new email({
            from,
            to,
            subject,
            text,
            scheduleTime,
            scheduleType,
            attachment
        });
        await newEmail.save();
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