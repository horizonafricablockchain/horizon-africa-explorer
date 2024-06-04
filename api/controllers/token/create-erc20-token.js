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
        return exits.success({
            message: 'ERC20 token creation logic is not yet implemented'
        });
    }
}