var cron = require('node-cron');
const sendShecduledEmail = async (newEmail) => {
    try {
        const { to, subject, text, attachments, scheduleType, sheduleTime, sheduleDate, sheduleDay } = newEmail;
        if (scheduleType === 'daily') {
            cron.schedule(`* ${sheduleTime} * * *`, () => {
                sendMail(to, subject, text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
        }
        else if (scheduleType === 'weekly') {
            cron.schedule(`* ${sheduleTime} * * ${sheduleDay}`, () => {
                sendMail(to, subject, text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
        }
        else if (scheduleType === 'monthly') {
            cron.schedule(`* ${sheduleTime} ${sheduleDate} * *`, () => {
                sendMail(to, subject, text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
        }
        else {
            const currMonth = new Date().getMonth();;
            cron.schedule(`* ${sheduleTime} ${sheduleDate} ${currMonth},${(currMonth + 3) % 12},${(currMonth + 6) % 12},${(currMonth + 9) % 12}  *`, () => {
                sendMail(to, subject, text, attachments);
            }, {
                scheduled: true,
                timezone: 'Asia/Kolkata'
            });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { sendShecduledEmail }