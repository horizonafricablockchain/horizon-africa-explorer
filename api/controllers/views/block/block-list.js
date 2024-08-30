module.exports = {
    friendlyName: 'List Blocks',
    description: 'Display list of blocks with pagination',
    inputs: {
        page: {
            type: 'number',
            defaultsTo: 1,
        },
        limit: {
            type: 'number',
            defaultsTo: 10,
        }
    },
    exits: {
        success: {
            viewTemplatePath: 'pages/block/block-list'
        }
    },
    fn: async function (inputs, exits) {
        // Fetch paginated blocks
        let skip = (inputs.page - 1) * inputs.limit;
        let blocks = await EthBlock.find({}).sort('number DESC').skip(skip).limit(inputs.limit);
        let totalBlocks = await EthBlock.count();

        return exits.success({
            blocks: blocks,
            totalBlocks: totalBlocks,
            currentPage: inputs.page,
            totalPages: Math.ceil(totalBlocks / inputs.limit)
        });
    }
};