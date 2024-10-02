module.exports = {
    friendlyName: "Displays the latest blocks list",
    description: "Displays a page with the list of the latest 10 blocks",
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/view-latest-blocks.pug"
        }
    },
    fn: async function(inputs, exits) {
        var latestBlockList = await EthBlock.find({}).sort('number DESC').limit(10);
        
        var validatorList = await Validator.find();
        
        if (latestBlockList && latestBlockList.length > 0) {
            for (var i = 0; i < latestBlockList.length; i++) {
                latestBlockList[i].number_transactions = await EthTransaction.count({
                    eth_block: latestBlockList[i].id
                });

                var findValidator = _.find(validatorList, {
                    address: latestBlockList[i].miner
                });

                if (findValidator) {
                    latestBlockList[i].miner = findValidator.name;
                }
            }
        }

        return exits.success({
            latest_block_list: latestBlockList
        });
    }
};