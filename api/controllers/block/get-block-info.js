module.exports = {
    friendlyName: "Get block informations",
    description: "Fetches block information based on block number.",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "json"
        },
        invalidBlock: {
            responseType: "notFound",
            description: "The block with the specified number was not found."
        }
    },
    fn: async function(inputs, exits) {
        try {
            const block = await EthBlock.findOne({ number: inputs.block_number });

            if (!block) {
                return exits.invalidBlock({ error: "Block not found" });
            }

            return exits.success(block);
        } catch (error) {
            return exits.error({ message: "An error occurred", error });
        }
    }
};