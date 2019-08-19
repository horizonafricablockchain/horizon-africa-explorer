module.exports = {
    friendlyName: "Gets the starting and ending block to scan",
    description: "",

    inputs: {},

    fn: async function(inputs, exits) {
        var currentBlockObject = null,
            currentBlock = 0,
            blockTrackerFound = await BlockTracker.findOne({
                type: "ETH"
            }),
            startBlockNumber = 0,
            difference = 0,
            endBlockNumber = 0;

        currentBlockObject = await sails.helpers.eth.web3.getBlockNumber();

        if (currentBlockObject && currentBlockObject.data && currentBlockObject.data.block_number) {
            currentBlock = currentBlockObject.data.block_number

            if (blockTrackerFound) {
                startBlockNumber = blockTrackerFound.block_number + 1;
                difference = currentBlock - blockTrackerFound.block_number;

                if (difference > sails.config.custom.eth.block_scanning_limit) {
                    endBlockNumber = blockTrackerFound.block_number + sails.config.custom.eth.block_scanning_limit;
                } else {
                    endBlockNumber = currentBlock;
                }
            } else {
                startBlockNumber = sails.config.custom.eth.default_start_block_number;
                endBlockNumber = startBlockNumber + sails.config.custom.eth.block_scanning_limit;
            }
        }

        return exits.success({
            startBlockNumber: startBlockNumber,
            endBlockNumber: endBlockNumber,
            currentBlock: currentBlock,
            blockTrackerFound: blockTrackerFound
        });
    }
};