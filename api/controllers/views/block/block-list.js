module.exports = {
    friendlyName: "Displays a block list page",
    description: "Displays a block list page",
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/block-list.pug"
        }
    },
    fn: async function(_, exits) {
        const blockList = await EthBlock.find({}).limit(50).sort('number DESC');
        return exits.success({
            blockList: blockList
        });
    }
};