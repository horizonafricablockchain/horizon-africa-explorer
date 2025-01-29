const EthBlock = require('../../models/EthBlock');

module.exports = {
    friendlyName: "Fetch latest blocks",
    description: "Fetches and prepares the last 10 blocks data",
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/fetch-latest-blocks.pug"
        }
    },
    fn: async function(inputs, exits) {
        try {
            // Fetch the latest 10 blocks
            var blocks = await EthBlock.find({
                sort: 'number DESC',
                limit: 10
            });

            // Return the blocks data
            return exits.success({
                blocks: blocks
            });
        } catch (error) {
            // Handle any errors
            return exits.error(error);
        }
    }
};