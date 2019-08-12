module.exports = {
    friendlyName: "Validates arguments for get-balance action",
    description: "Validates arguments for get-balance action",
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
        if(inputs && inputs.data && inputs.data.account_address && inputs.data.token_address) {
            // everything is valid
            exits.success([]);
        } else {
            exits.success([inputs.i18n.__("common.invalid_parameters")]);
        }
    }
};