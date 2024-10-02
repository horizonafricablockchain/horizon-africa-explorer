module.exports = {
    friendlyName: "Fetch latest 10 blocks",
    description: "Fetch the latest 10 blocks from the Ethereum blockchain",
    exits: {
        success: {
            responseType: "json"
        }
    },
    fn: async function(inputs, exits) {
        const blocksData = await sails.helpers.eth.getLatestBlocks();
        return exits.success(blocksData);
    }
};