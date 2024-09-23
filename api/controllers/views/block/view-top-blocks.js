module.exports = {
    friendlyName: "Displays the latest top 10 blocks",
    description: "Fetches and displays the latest top 10 blocks",
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/view-top-blocks.pug"
        }
    },
    fn: async function(inputs, exits) {
        var latestBlocks = await EthBlock.find()
            .sort('number DESC')
            .limit(10);
        return exits.success({
            latest_blocks: latestBlocks
        });
    }
};