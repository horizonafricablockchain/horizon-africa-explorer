// latestBlocksController.js

const EthBlock = require('../../../models/EthBlock');//test

module.exports = {
    friendlyName: 'View latest blocks',

    description: 'Displays the latest 15 Ethereum blocks.',

    exits: {
        success: {
            viewTemplatePath: 'pages/block/latest-blocks'
        }
    },

    fn: async function () {
        // Retrieve the latest 15 blocks ordered by createdAt date
        const latestBlocks = await EthBlock.find().sort('createdAt DESC').limit(15);

        // Send the blocks to the view
        return {
            blocks: latestBlocks
        };
    }
};