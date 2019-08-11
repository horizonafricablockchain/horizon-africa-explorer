module.exports = {
    friendlyName: "Scans blocks and retrieves details to store in database",
    description: "Scans blocks and retrieves details to store in database",
    inputs: {
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        var blocksToScan = {},
            scannedBlocks = [];

        blocksToScan = await sails.helpers.eth.getBlocksToScan();

        sails.log.debug("scan-eth.js (Line: 15) : Scanning blocks"); //debug
        sails.log.debug(blocksToScan.startBlockNumber + " - " + blocksToScan.endBlockNumber); //debug

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
        }

        return exits.success({
            message: "scan-eth completed"
        });
    }
}