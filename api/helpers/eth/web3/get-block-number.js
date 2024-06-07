module.exports = {
    friendlyName: "Get block number from running eth node",
    description: "The block number represents the number of blocks that have been synced",

    inputs: {},

    fn: async function(inputs, exits) {
        try {
            var node = await sails.helpers.node.getReadNode();
            var blockNumber = await sails.helpers.utilities.apiUtility("/block/get-block-number", "POST", {});
            return exits.success(blockNumber);
        } catch (error) {
            sails.log.error("Error in get-block-number.js: ", error);
            return exits.error(error);
        }
    }
};