module.exports = {
    friendlyName: "Get block number from running eth node",
    description: "The block number represents the number of blocks that have been synced",

    inputs: {},

    fn: async function(inputs, exits) {
        var node = await sails.helpers.node.getReadNode();
        var blockNumber = await sails.helpers.utilities.apiUtility("/block/get-block-number", "POST", {}, node, sails.i18n);

        return exits.success(blockNumber);
    }
};