module.exports = {
    friendlyName: "Scans block from an ETH node",
    description: "This will return an array of blocks containing an array of transactions in the respective block",

    inputs: {
        start: {
            type: "number",
            example: 10,
            description: "The block number to start the scan with",
            required: true
        },
        end: {
            type: "number",
            example: 20,
            description: "The block number to stop the scan with",
            required: true
        }
    },

    fn: async function(inputs, exits) {
        var blockNumberArray = [],
            blockArray = [],
            transactionArray = [],
            blockDetails,
            tokens = await Token.find();

        for (var i = inputs.start; i <= inputs.end; i++) {
            blockNumberArray.push(i);
        }

        for (var i = 0; i < blockNumberArray.length; i++) {
            blockDetails = await sails.helpers.eth.web3.getBlock(blockNumberArray[i], true);

            if (blockDetails && blockDetails.data) {
                if (blockDetails.data.transactions && blockDetails.data.transactions.length > 0) {
                    _.each(blockDetails.data.transactions, function(tx) {
                        transactionArray.push(tx);
                    });
                }

                blockDetails.data.hash_lower = blockDetails.data.hash.toLowerCase();
                blockDetails.data.parentHash_lower = blockDetails.data.parentHash.toLowerCase();
                delete blockDetails.data.transactions;

                blockArray.push(blockDetails.data);
            }
        }

        var blocksCreated = await EthBlock.createEach(blockArray)
            .fetch();

        await sails.helpers.eth.extractTransactions(blocksCreated, transactionArray, tokens);

        return exits.success(blocksCreated);
    }
};