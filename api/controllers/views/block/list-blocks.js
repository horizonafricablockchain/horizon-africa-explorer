module.exports = {//changes
    friendlyName: "List latest blocks",
    description: "Displays a list of the last 10 blocks",
    exits: {
        success: {
            responseType: "view",//this is just a comment
            viewTemplatePath: "views_moltran/pages/block/list-blocks.pug"
        }
    },
    fn: async function(_, exits) {
        const latestBlocks = await EthBlock.find({
            sort: 'number DESC',
            limit: 10
        });

        return exits.success({
            blocks: latestBlocks
        });
    }
};