var cron = require('node-cron');
const { sendMail } = require('./sendMail');
const sendShecduledEmail = async (newEmail) => {
    try {
        const { to, subject, text, attachments, scheduleType, scheduleTime, scheduleDate, scheduleDay } = newEmail;
        if (scheduleType === 'daily') {
            cron.schedule(`* ${scheduleTime} * * *`, () => {
                sendMail(to, subject, "Daily Emails", text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
            console.log("Email Scheduled");
        }
        else if (scheduleType === 'weekly') {
            cron.schedule(`* ${scheduleTime} * * ${scheduleDay}`, () => {
                sendMail(to, subject, "Weekly Emails", text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
            console.log("Email Scheduled");
        }
        else if (scheduleType === 'monthly') {
            cron.schedule(`* ${scheduleTime} ${scheduleDate} * *`, () => {
                sendMail(to, subject, "Monthly Emails", text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            }); console.log("Email Scheduled");
        }
        else {
            const currMonth = new Date().getMonth();;
            cron.schedule(`* ${scheduleTime} ${scheduleDate} ${currMonth},${(currMonth + 3) % 12},${(currMonth + 6) % 12},${(currMonth + 9) % 12}  *`, () => {
                sendMail(to, subject, "Quarterly Emails", text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
            console.log("Email Scheduled");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { sendShecduledEmail }