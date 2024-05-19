module.exports = {
    friendlyName: "Displays the list of transactions for a given address",
    description: "Displays the list of transactions for a given address",
    inputs: {
        address: {
            type: "string",
            required: true
        },
        page: {
            type: 'number',
            defaultsTo: 1
        },
        pageSize: {
            type: 'number',
            defaultsTo: 10
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/address/view-address-transaction.pug"
        }
    },
    fn: async function(inputs, exits) {
        var skip = (inputs.page - 1) * inputs.pageSize;

        var transactionList = await EthTransaction.find({
            or: [
                { to_lower: inputs.address.toLowerCase() },
                { from_lower: inputs.address.toLowerCase() }
            ]
        })
        .sort("blockNumber DESC")
        .skip(skip)
        .limit(inputs.pageSize);

        var totalTransactions = await EthTransaction.count({
            or: [
                { to_lower: inputs.address.toLowerCase() },
                { from_lower: inputs.address.toLowerCase() }
            ]
        });

        var totalPages = Math.ceil(totalTransactions / inputs.pageSize);

        return exits.success({
            transaction_list: transactionList,
            address: inputs.address,
            currentPage: inputs.page,
            totalPages: totalPages
        });
    }
};