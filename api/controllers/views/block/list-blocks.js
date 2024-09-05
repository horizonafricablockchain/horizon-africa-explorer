module.exports = {
    friendlyName: 'List Blocks',
    description: 'Show a list of blocks.',
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: 'pages/block/list-blocks'
        }
    },
    fn: async function (inputs, exits) {
        const blocks = await EthBlock.find().sort('number DESC').limit(50);
        return exits.success({ blocks });
    }
};