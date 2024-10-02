module.exports = {
    friendlyName: "Get latest blocks",
    description: "Fetches the latest 10 Ethereum blocks and returns them as a JSON response.",
    exits: {
        success: {
            responseType: "json"
        },
        serverError: {
            description: 'Server error',
            responseType: 'serverError'
        }
    },
    fn: async function(inputs, exits) {
        try {
            const web3 = await sails.helpers.eth.getWeb3();
            const latestBlockNumber = await web3.eth.getBlockNumber();
            const blockPromises = [];
            for (let i = 0; i < 10; i++) {
                blockPromises.push(web3.eth.getBlock(latestBlockNumber - i));
            }
            const latestBlocks = await Promise.all(blockPromises);
            return exits.success({ blocks: latestBlocks });
        } catch (err) {
            sails.log.error('Error fetching the latest blocks:', err);
            return exits.serverError();
        }
    }
};