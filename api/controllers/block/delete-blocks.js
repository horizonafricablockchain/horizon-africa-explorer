module.exports = {
    friendlyName: "Delete Blocks",
    description: "Delete a list of blocks based on block numbers",
    inputs: {
        blockNumbers: {
            type: "ref",
            required: true,
            description: "An array of block numbers to be deleted",
            example: [12345, 67890]
        }
    },
    exits: {
        success: {
            description: "Blocks deleted successfully"
        },
        notFound: {
            description: "No blocks found for the provided block numbers",
            responseType: "notFound"
        }
    },
    fn: async function (inputs, exits) {
        try {
            const blockNumbersToDelete = inputs.blockNumbers;

            // Delete blocks from EthBlock model
            await EthBlock.destroy({
                number: { in: blockNumbersToDelete }
            });

            // Delete transactions associated with the deleted blocks from EthTransaction model
            await EthTransaction.destroy({
                blockNumber: { in: blockNumbersToDelete }
            });

            return exits.success({
                message: `Successfully deleted blocks and transactions for block numbers: ${blockNumbersToDelete.join(", ")}`
            });
        } catch (error) {
            sails.log.error(error);
            return exits.error({
                message: "An error occurred while deleting the blocks."
            });
        }
    }
};