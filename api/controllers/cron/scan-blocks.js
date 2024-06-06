module.exports = {
    friendlyName: "Scans blocks and retrieves details to store in database",
    description: "Scans blocks and retrieves details to store in database",
    inputs: {},
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        let blocksToScan = {},
            scannedBlocks = [];

        blocksToScan = await sails.helpers.eth.getBlocksToScan();
        scannedBlocks = await sails.helpers.eth.scanBlocks(blocksToScan.startBlockNumber, blocksToScan.endBlockNumber);

        if (blocksToScan.blockTrackerFound) {
            if (blocksToScan.endBlockNumber > 0) {
                await BlockTracker.update({
                    type: "ETH"
                }, {
                    block_number: blocksToScan.endBlockNumber,
                    eth_current_block: blocksToScan.currentBlock
                });
            }
        } else {
            await BlockTracker.create({
                type: BlockTracker.constants.type.eth,
                block_number: blocksToScan.endBlockNumber,
                eth_current_block: blocksToScan.currentBlock
            });
        }

        return exits.success({
            message: "scan-eth completed"
        });
    }
}
