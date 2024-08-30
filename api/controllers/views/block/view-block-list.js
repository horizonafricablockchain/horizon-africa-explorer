const EthBlock = require('../../../models/EthBlock');

module.exports = {
    friendlyName: 'View Block List',
    description: 'Display a list of blocks with pagination.',

    inputs: {
        page: {
            type: 'number',
            defaultsTo: 1
        }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/block/view-block-list'
        }
    },

    fn: async function(inputs, exits) {
        const pageSize = 10;
        const skip = (inputs.page - 1) * pageSize;
        const totalBlocks = await EthBlock.count();
        const blocks = await EthBlock.find()
            .sort('number DESC')
            .limit(pageSize)
            .skip(skip);

        return exits.success({
            blocks,
            currentPage: inputs.page,
            totalPages: Math.ceil(totalBlocks / pageSize)
        });
    }
};