module.exports = {
    friendlyName: "Displays the list of transactions for a given address",
    description: "Displays the list of transactions for a given address",
    inputs: {
        address: {
            type: "string",
            required: true
        },
        skip: {
            type: 'number',
            defaultsTo: 0
        },
        limit: {
            type: 'number',
            defaultsTo: 25
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
        }).sort("blockNumber DESC").skip(inputs.skip).limit(inputs.limit);

        return exits.success({
            transaction_list: transactionList,
            address: inputs.address,
            skip: inputs.skip,
            limit: inputs.limit
        });
    }
};