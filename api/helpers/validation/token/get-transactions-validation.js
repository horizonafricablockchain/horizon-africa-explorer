module.exports = {
    friendlyName: "Validates arguments for get-transactions action",
    description: "Validates arguments for get-transactions action",
    inputs: {
        data: {
            type: {},
            description: "Data to be validated"
        },
        i18n: {
            type: "ref",
            description: "i18n object for multilanguage",
            required: true
        }

    },
    exits: {
        invalidParameters: {
            responseType: "invalidParameters"
        }
    },

    fn: async function(inputs, exits) {
        var simplevalidator = require("@suyashsumaroo/simple-validator"),
            error = [];

        if (inputs && inputs.data && inputs.data.account_address && inputs.data.token_address) {
            if (inputs.data.skip) {
                var validationElements = [{
                    type: simplevalidator.constants.type.number,
                    value: inputs.data.skip,
                    name: "Skip"
                }];

                var error = simplevalidator.validate(validationElements);

                if (error.length > 0) {
                    exits.success([inputs.i18n.__("common.invalid_parameters")]);
                } else {
                    exits.success([]);
                }
            } else {
                exits.success([]);
            }
        } else {
            exits.success([inputs.i18n.__("common.invalid_parameters")]);
        }
    }
};