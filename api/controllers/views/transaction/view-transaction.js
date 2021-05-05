module.exports = {
    friendlyName: "Displays details for a given transaction",
    description: "Displays details for a given transaction",
    inputs: {
        transaction_hash: {
            type: "string",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/transaction/view-transaction.pug"
        }
    },
    fn: async function(inputs, exits) {
        var transactionList = await EthTransaction.find({
                hash_lower: inputs.transaction_hash.toLowerCase()
            }),
            transaction = null,
            blockTrackerList = await BlockTracker.find({
                type: "ETH"
            }).limit(1),
            lastBlockNumber = 0;

        if (transactionList && transactionList[0]) {
            transaction = transactionList[0];

            if (blockTrackerList && blockTrackerList[0]) {
                lastBlockNumber = blockTrackerList[0].eth_current_block;
                transaction.confirmations = lastBlockNumber - transaction.blockNumber;
            }

        }

        return exits.success({
            transaction: transaction
        });
    }
}