module.exports = {
    friendlyName: "List blocks",
    description: "Returns a list of blocks based on the block number",
    inputs: {
        blockNumber: {
            type: "number",
            required: true
        }
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
        try {
            let blocks = await EthBlock.find({ number: inputs.blockNumber });
            return exits.success({ blocks });
        } catch (err) {
            return exits.jsonError(err.message);
        }
    }
};
