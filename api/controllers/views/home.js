module.exports = {
    // This function is responsible for displaying the home page of the Ethereum Blockchain Explorer.
    // It aggregates and prepares blockchain-related data, including Ethereum block tracker,
    // blocks, and transactions, before sending this data to the view template.
    friendlyName: "Displays home page",
    description: "Displays home page",
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/home.pug"
        }
    },
    fn: async function(inputs, exits) {
        // Fetch the Ethereum block tracker
        var blockTrackerList = await BlockTracker.find({
                type: BlockTracker.constants.type.eth
            }),
            blockTracker = null,
            // Count the total Ethereum transactions
            transactionCount = await EthTransaction.count({}),
            // Retrieve the latest 10 blocks sorted by the createdAt date
            latestBlockList = await EthBlock.find({}).sort("createdAt DESC").limit(10),
            // Retrieve the latest 10 transactions and populate their associated blocks
            latestTransactionList = await EthTransaction.find({}).populate("eth_block").sort("createdAt DESC").limit(10),
            validatorList = await Validator.find(),
            findValidator = null,
            web3 = await sails.helpers.eth.getWeb3();

        if (blockTrackerList && blockTrackerList.length > 0) {
            blockTracker = blockTrackerList[0];
        }

        // For each block, count the number of transactions and find the validator
        if (latestBlockList && latestBlockList.length > 0) {
            for (var i = 0; i < latestBlockList.length; i++) {
                latestBlockList[i].number_transactions = await EthTransaction.count({
                    eth_block: latestBlockList[i].id
                });

                findValidator = _.find(validatorList, {
                    address: latestBlockList[i].miner
                });

                if (findValidator) {
                    latestBlockList[i].validator = findValidator;
                }
            }
        }

        // Convert the transaction value from Wei to Ether
        for (var i = 0; i < latestTransactionList.length;i++) {
            latestTransactionList[i].ether_value = web3.utils.fromWei(latestTransactionList[i].value, "ether");
        }

        // Return the aggregated data to the view
        return exits.success({
            block_tracker: blockTracker,
            transaction_count: transactionCount,
            latest_block_list: latestBlockList,
            latest_transaction_list: latestTransactionList
        });
    }
};