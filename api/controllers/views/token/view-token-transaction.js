module.exports = {
    friendlyName: "Displays the list of token transactions",
    description: "Displays the list of token transactions",
    inputs: {
        address: {
            type: "string",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/token/view-token-transaction.pug"
        }
    },
    fn: async function(inputs, exits) {
        var tokenResponse = await sails.helpers.utilities.haApiUtility("/api/v1/token/list", "POST", {
                search_criteria: {
                    address: inputs.address.toLowerCase()
                }
            }),
            tokenTransactionList = await TokenTransaction.find({
                token_address: inputs.address.toLowerCase()
            }),
            token = null;

        if (tokenResponse && tokenResponse.data && tokenResponse.data[0]) {
            token = tokenResponse.data[0];
        }

        return exits.success({
            token: token,
            transaction_list: tokenTransactionList
        });
    }
}