module.exports = {
    friendlyName: 'Latest Blocks',
    description: 'Display Latest Top 10 Blocks',
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: 'pages/latest-blocks'
        }
    },
    fn: async function(inputs, exits) {
        try {
            // Fetch the latest 10 blocks sorted by block number in descending order
            const blocks = await EthBlock.find({
                sort: 'number DESC',
                limit: 10
            });
            return exits.success({ blocks });
        } catch (error) {
            return this.res.serverError(error);
        }
    }
};