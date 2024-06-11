module.exports = {
    friendlyName: "Get block by number",
    description: "Fetch block details based on block number",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            responseType: 'json',
            statusCode: 200
        },
        notFound: {
            description: 'No block with the specified number was found in the database.',
            responseType: 'notFound'
        }
    },
    fn: async function(inputs, exits) {
        try {
            var block = await EthBlock.findOne({
                number: inputs.block_number
            });

            if (!block) {
                return exits.notFound({
                    message: 'Block not found'
                });
            }

            return exits.success(block);
        } catch (err) {
            return exits.error({
                message: 'An error occurred while fetching the block',
                error: err.message
            });
        }
    }
}