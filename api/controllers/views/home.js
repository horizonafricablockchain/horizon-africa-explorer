module.exports = {
    friendlyName: "Displays home page",
    description: "Displays home page",
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/home.pug"
        }
    },
    fn: async function(inputs, exits) {
        // Initialize variables
        var blockTrackerList = await BlockTracker.find({ type: BlockTracker.constants.type.eth }),
            blockTracker = null,
            transactionCount = await EthTransaction.count({}),
            latestBlockList = [],
            latestTransactionList = [],
            validatorList = await Validator.find(),
            findValidator = null,
            web3 = await sails.helpers.eth.getWeb3();

        // Retrieve and process block tracker
        if (blockTrackerList && blockTrackerList.length > 0) {
            blockTracker = blockTrackerList[0];
        }

        // Fetch latest 10 blocks sorted by createdAt
        latestBlockList = await EthBlock.find({}).sort("createdAt DESC").limit(10);

        // Fetch latest 10 transactions
        latestTransactionList = await EthTransaction.find({}).populate("eth_block").sort("createdAt DESC").limit(10);

        // Process each block to find number of transactions and validate blocks
        if (latestBlockList && latestBlockList.length > 0) {
            for (var i = 0; i < latestBlockList.length; i++) {
                latestBlockList[i].number_transactions = await EthTransaction.count({ eth_block: latestBlockList[i].id });
                findValidator = _.find(validatorList, { address: latestBlockList[i].miner });

                if (findValidator) {
                    latestBlockList[i].validator = findValidator;
                }
            }
        }

        // Convert transaction values from Wei to Ether
        for (var i = 0; i < latestTransactionList.length; i++) {
            latestTransactionList[i].ether_value = web3.utils.fromWei(latestTransactionList[i].value, "ether");
        }

        // Return the data to the view
        return exits.success({
            block_tracker: blockTracker,
            transaction_count: transactionCount,
            latest_block_list: latestBlockList,
            latest_transaction_list: latestTransactionList
        });
    }
}