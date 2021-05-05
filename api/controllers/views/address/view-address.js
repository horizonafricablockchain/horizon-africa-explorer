module.exports = {
    friendlyName: "Displays the list of transactions for a given address",
    description: "Displays the list of transactions for a given address",
    inputs: {
        address: {
            type: "string",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/address/view-address-transaction.pug"
        }
    },
    fn: async function(inputs, exits) {
        var transactionList = await EthTransaction.find({
            or: [{
                to_lower: inputs.address.toLowerCase()
            }, {
                from_lower: inputs.address.toLowerCase()
            }]
        }).sort("blockNumber DESC");

        return exits.success({
            transaction_list: transactionList,
            address: inputs.address
        });
    }
}