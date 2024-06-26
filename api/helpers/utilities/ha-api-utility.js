module.exports = {
    friendlyName: "Call api requests to cryptofish api layer",
    description: "Call api requests to cryptofish api layer",
    inputs: {
        action: {
            type: "string",
            example: "/block/get-block",
            description: "The action path",
            required: true
        },
        method: {
            type: "string",
            example: "POST",
            description: "The method to be used for the request - either 'GET' or 'POST'",
            required: true
        },
        data: {
            type: {},
            description: "Data to be sent for API request",
            required: true
        }
    },

    fn: async function(inputs, exits) {
        var request = require("request"),
            url = sails.config.appsettings.ha_api_config.url,
            params = {
                data: inputs.data,
                auth: {}
            };

        var options = {
            uri: url + inputs.action,
            method: inputs.method,
            json: params
        };

        request(options, function(error, response, body) {
            if (error) {
                sails.log.debug("api-utility.js (Line: 45) : error"); //debug
                sails.log.debug(error); //debug

                if (error.code && error.code == "ECONNRESET") {
                    exits.success({
                        code: "ECONNRESET",
                    });
                } else {
                    exits.success(error);
                }
            } else {
                if (body && body.success) {
                    exits.success(body);
                } else {
                    if (body.error) {
                        exits.success({
                            error: body.error
                        });
                    } else {
                        exits.success({
                            error: []
                        });
                    }
                }
            }
        });
    }
};