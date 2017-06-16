'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const actions = require('./actions.js');
const requestLogger = require('./middleware/requestLogger.js');

const restService = express();
restService.use(bodyParser.json());

// Middleware

// Request logging for testing
if(process.env.LOG_REQUESTS){
    let _logFolder = 'log';
    restService.use(requestLogger.logToFile(_logFolder));
}

// Routes
restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var response = {
            speech: "",
            displayText: "",
            // contextOut: {},
            source: 'testor-ws'
        };


        if (req.body) {
            var requestBody = req.body;
            if (requestBody.result) {
                if (requestBody.result.action) {
                    response = actions.routeRequest(requestBody.result.action, requestBody, response);

                }
            }
        }

        console.log(JSON.stringify(response));
        return res.json(response);
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});