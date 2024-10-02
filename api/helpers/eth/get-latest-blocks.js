module.exports = {
    friendlyName: "Get latest 10 Ethereum blocks",
    description: "Fetch the latest 10 blocks from the Ethereum blockchain",
    inputs: {},
    fn: async function(inputs, exits) {
        const web3 = await sails.helpers.eth.getWeb3();
        const latestBlockNumber = await web3.eth.getBlockNumber();
        const blockFetchPromises = [];
        for (let i = 0; i < 10; i++) {
            blockFetchPromises.push(web3.eth.getBlock(latestBlockNumber - i));
        }
        const blocks = await Promise.all(blockFetchPromises);
        const blocksData = blocks.map(block => ({
            blockNumber: block.number,
            miner: block.miner,
            timestamp: block.timestamp,
            transactionCount: block.transactions.length
        }));
        return exits.success(blocksData);
    }
};