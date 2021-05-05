module.exports = {
    friendlyName: "Displays the list of transactions for a given block",
    description: "Displays the list of transactions for a given block",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/transaction/view-block-transaction.pug"
        }
    },
    fn: async function(inputs, exits) {
        var transactionList = await EthTransaction.find({
            blockNumber: inputs.block_number
        });

        return exits.success({
            transaction_list: transactionList,
            block_number: inputs.block_number
        });
    }
}