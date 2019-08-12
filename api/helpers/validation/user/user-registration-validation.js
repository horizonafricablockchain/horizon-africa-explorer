module.exports = {
    friendlyName: "Validates arguments for user registration action",
    description: "Validates arguments for user registration action",
    inputs: {
        data: {
            type: {},
            description: "Data to be validated",
            example: {
                email: "suyash515@gmail.com",
                password: "password-test"
            }
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

        if (inputs && inputs.data && inputs.data.email && inputs.data.password) {
            var validationElements = [{
                type: simplevalidator.constants.type.email,
                value: inputs.data.email,
                name: inputs.i18n.__("common.email")
            }, {
                type: simplevalidator.constants.type.string,
                value: inputs.data.password,
                name: inputs.i18n.__("common.password")
            }];

            var error = simplevalidator.validate(validationElements);

            if (error.length > 0) {
                exits.success(error);
            } else {
                exits.success([]);
            }
        } else {
            exits.success([inputs.i18n.__("common.invalid_parameters")]);
        }
    }
};