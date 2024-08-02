const { sheduleEmail, retrieveEmailDetails, deleteShedules, retrieveMails } = require('../controller/email.controller');

const emailRoute = require('express').Router();

emailRoute.post('/schedule', sheduleEmail);
emailRoute.get('/retrieve', retrieveMails);
emailRoute.get('/retrieve/:id', retrieveEmailDetails);
emailRoute.delete('/delete/:id', deleteShedules);

module.exports = emailRoute;