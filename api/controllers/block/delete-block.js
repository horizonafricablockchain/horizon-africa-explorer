module.exports = {
    friendlyName: "Delete block by block number",
    description: "Deletes a block and its associated transactions using the block number",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            statusCode: 200,
            description: 'Block deleted successfully'
        },
        notFound: {
            statusCode: 404,
            description: 'Block not found'
        },
        serverError: {
            statusCode: 500,
            description: 'Server error'
        }
    },
    fn: async function (inputs, exits) {
        try {
            // Find the block by number
            const block = await EthBlock.findOne({
                number: inputs.block_number
            });
            if (!block) {
                return exits.notFound({
                    message: 'Block not found'
                });
            }

            // Delete associated transactions
            await EthTransaction.destroy({
                eth_block: block.id
            });

            // Delete the block
            await EthBlock.destroy({
                id: block.id
            });

            return exits.success({
                message: 'Block deleted successfully'
            });
        } catch (err) {
            return exits.serverError({
                message: 'An error occurred while deleting the block',
                error: err.message
            });
        }
    }
};