module.exports = {
    friendlyName: "List blocks",
    description: "List blocks based on block number",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "jsonOk"
        },
        jsonError: {
            responseType: "jsonError"
        }
    },
    fn: async function(inputs, exits) {
        try {
            // Fetch blocks based on block number
            var blocks = await EthBlock.find({
                number: inputs.block_number
            });

            // Check if blocks were found
            if (!blocks || blocks.length === 0) {
                return exits.jsonError({
                    message: "No blocks found for the specified block number",
                    data: []
                });
            }

            return exits.success({
                message: "Blocks retrieved successfully",
                data: blocks
            });
        } catch (error) {
            return exits.jsonError({
                message: "Error retrieving blocks",
                error: error.message
            });
        }
    }
};