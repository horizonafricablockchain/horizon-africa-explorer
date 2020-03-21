module.exports = {
    friendlyName: "Adds token",
    description: "Adds token",
    inputs: {
        data: {
            type: {},
            example: {
                address: "0x8fbb9d871234c8d7ff0846035bbb3ddf7097a489",
                decimals: 18,
                token_type: "ERC20"
            }
        },
        auth: {
            type: {},
            example: {
                app_token: ""
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        var error = [],
            simpleValidator = require("@suyashsumaroo/simple-validator"),
            validationElements = [],
            existingToken = null,
            insertParams = {},
            newTokenRecord = null;

        try {
            if (inputs.data) {
                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    maxLength: Token.attributes.address.maxLength,
                    value: inputs.data.address,
                    name: "Address",
                    required: Token.attributes.address.required
                }, {
                    type: simpleValidator.constants.type.number,
                    maxLength: Token.attributes.decimals.maxLength,
                    value: inputs.data.decimals,
                    name: "Decimals",
                    required: Token.attributes.decimals.required
                }, {
                    type: simpleValidator.constants.type.enum,
                    value: inputs.data.token_type,
                    name: "Token Type",
                    in: Token.attributes.token_type.validations.isIn
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    exits.jsonError(error);
                } else {
                    // check if Token already exists
                    existingToken = await Token.find({
                        address: inputs.data.address.toLowerCase()
                    });

                    if (existingToken.length > 0) {
                        error.push(await sails.helpers.utilities.error.getAppError("token.address_already_exists"));
                        exits.jsonError(error);

                    } else {
                        // create Token
                        insertParams = {
                            address: inputs.data.address.toLowerCase(),
                            decimals: inputs.data.decimals,
                            token_type: inputs.data.token_type
                        };

                        newTokenRecord = await Token.create(insertParams);

                        exits.success({
                            successMessage: "Token created"
                        });
                    }
                }
            } else {
                error.push(await sails.helpers.utilities.error.getAppError("general.invalid_parameters"));
                exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("add-Token.js (Line: 116) : err"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utilities.error.getAppError("general.unknown_error"));
            exits.jsonError(error);
        }
    }
}