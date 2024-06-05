module.exports = {
    friendlyName: "List blocks by number",
    description: "Fetch and list blocks based on block numbers",
    inputs: {
        block_numbers: {
            type: 'json',
            required: true,
            description: 'An array of block numbers to fetch',
            example: [1234567, 1234568]
        }
    },
    exits: {
        success: {
            responseType: 'json'
        },
        notFound: {
            description: 'No blocks found for the provided block numbers',
            responseType: 'notFound'
        }
    },
    fn: async function (inputs, exits) {
        const blocks = await EthBlock.find({
            number: { in: inputs.block_numbers }
        });
        if (blocks.length === 0) {
            return exits.notFound({
                message: 'No blocks found for the provided block numbers'
            });
        }
        return exits.success(blocks);
    }
};