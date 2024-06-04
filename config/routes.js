module.exports = {
    friendlyName: "Delete block",
    description: "Delete block by block number",
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
        notFound: {
            responseType: "jsonError",
            statusCode: 404
        },
        invalid: {
            responseType: "jsonError",
            statusCode: 400
        }
    },
    fn: async function (inputs, exits) {
        try {
            const block = await EthBlock.findOne({ number: inputs.block_number });
            
            if (!block) {
                return exits.notFound({
                    message: `Block number ${inputs.block_number} not found.`
                });
            }
            
            await EthTransaction.destroy({ blockNumber: inputs.block_number });
            await EthBlock.destroy({ id: block.id });
            
            return exits.success({
                message: `Block number ${inputs.block_number} and its transactions have been deleted.`
            });
        } catch (error) {
            return exits.invalid({
                message: 'An error occurred during deletion',
                error
            });
        }
    }
};