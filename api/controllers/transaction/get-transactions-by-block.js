module.exports = {
    friendlyName: "Get transactions by block number",
    description: "Fetches the list of transactions for a given block number",
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
        notFound: {
            description: "No transactions found for the given block number.",
            responseType: "notFound"
        }
    },
    fn: async function(inputs, exits) {
        // Retrieve the EthBlock based on the block number
        let block = await EthBlock.findOne({ number: inputs.block_number });

        if (!block) {
            return exits.notFound({
                error: "No block found with the given block number."
            });
        }

        // Retrieve the EthTransaction objects based on the eth_block
        let transactions = await EthTransaction.find({
            eth_block: block.id
        });

        if (transactions.length === 0) {
            return exits.notFound({
                error: "No transactions found for the given block number."
            });
        }

        return exits.success(transactions);
    }
};