module.exports = {
    friendlyName: "Create ERC20 token",
    description: "Creates a new ERC20 token",
    inputs: {
        name: {
            type: 'string',
            required: true,
            description: 'The name of the token'
        },
        symbol: {
            type: 'string',
            required: true,
            description: 'The symbol of the token'
        },
        decimals: {
            type: 'number',
            required: true,
            description: 'The number of decimals the token uses'
        },
        totalSupply: {
            type: 'number',
            required: true,
            description: 'The total supply of the token'
        }
    },
    exits: {
        jsonError: {
            responseType: 'jsonError'
        },
        success: {
            responseType: 'jsonOk'
        }
    },
    fn: async function(inputs, exits) {
        var error = [],
            simpleValidator = require("@suyashsumaroo/simple-validator"),
            validationElements = [{
                type: simpleValidator.constants.type.string,
                value: inputs.name,
                name: "Name",
                required: true
            }, {
                type: simpleValidator.constants.type.string,
                value: inputs.symbol,
                name: "Symbol",
                required: true
            }, {
                type: simpleValidator.constants.type.number,
                value: inputs.decimals,
                name: "Decimals",
                required: true
            }, {
                type: simpleValidator.constants.type.number,
                value: inputs.totalSupply,
                name: "Total Supply",
                required: true
            }];

        error = simpleValidator.validate(validationElements);

        if (error.length > 0) {
            return exits.jsonError(error);
        }

        // Check if the token already exists
        var existingToken = await Token.find({
            name: inputs.name,
            symbol: inputs.symbol
        });

        if (existingToken.length > 0) {
            error.push(await sails.helpers.utilities.error.getAppError("token_already_exists"));
            return exits.jsonError(error);
        }

        // Interaction with Ethereum Network to create token (placeholder for blockchain operation)
        // Example: create the token on the blockchain and get the result
        // var createTokenResult = await sails.helpers.eth.createErc20Token(inputs);

        // If success, store token details in the database
        var newTokenRecord = await Token.create({
            name: inputs.name,
            symbol: inputs.symbol,
            decimals: inputs.decimals,
            totalSupply: inputs.totalSupply
        }).fetch();

        return exits.success({
            message: 'Token created successfully',
            token: newTokenRecord
        });
    }
};
