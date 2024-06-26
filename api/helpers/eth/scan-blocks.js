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
            // blockArray = [],
            // transactionArray = [],
            // blockDetails,
            tokens = await Token.find(),
            // blockRecord = {},
            blockNumber = 0;

        for (var i = inputs.start; i <= inputs.end; i++) {
            blockNumberArray.push(i);
        }

        for (var i = 0; i < blockNumberArray.length; i++) {
            blockNumber = blockNumberArray[i];

            (function(block) {
                var transactionArray = [],
                    blockRecord = {},
                    blockArray = [];

                sails.helpers.eth.web3.getBlock(block, true)
                    .then(function(blockDetails) {
                        if (blockDetails && blockDetails.data) {
                            if (blockDetails.data.transactions && blockDetails.data.transactions.length > 0) {
                                _.each(blockDetails.data.transactions, function(tx) {
                                    transactionArray.push(tx);
                                });
                            }

                            blockRecord = {
                                author: blockDetails.data.author,
                                difficulty: blockDetails.data.difficulty,
                                extraData: blockDetails.data.extraData,
                                gasLimit: blockDetails.data.gasLimit,
                                gasUsed: blockDetails.data.gasUsed,
                                hash: blockDetails.data.hash,
                                hash_lower: blockDetails.data.hash.toLowerCase(),
                                miner: blockDetails.data.miner,
                                number: blockDetails.data.number,
                                parentHash: blockDetails.data.parentHash,
                                parentHash_lower: blockDetails.data.parentHash.toLowerCase(),
                                receiptsRoot: blockDetails.data.receiptsRoot,
                                sha3Uncles: blockDetails.data.sha3Uncles,
                                size: blockDetails.data.size,
                                stateRoot: blockDetails.data.stateRoot,
                                timestamp: blockDetails.data.timestamp,
                                totalDifficulty: blockDetails.data.totalDifficulty,
                                transactionsRoot: blockDetails.data.transactionsRoot
                            }

                            console.log("created block element for: " + blockDetails.data.number);//debug

                            return EthBlock.create(blockRecord).fetch();
                        }
                    }).then(function(createdBlock) {
                        return sails.helpers.eth.extractTransactions([createdBlock], transactionArray, tokens);
                    }).then(function() {
                        console.log("completed processing block " + block);//debug
                    });
            })(blockNumber);
        }

        // var blocksCreated = await EthBlock.createEach(blockArray)
        //     .fetch();

        // await sails.helpers.eth.extractTransactions(blocksCreated, transactionArray, tokens);

        return exits.success({});
        // return exits.success(blocksCreated);
    }
};