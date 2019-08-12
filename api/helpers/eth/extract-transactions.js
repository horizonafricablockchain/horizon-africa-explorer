module.exports = {
    friendlyName: "Extracts transactions from a block array and saves to separate transaction table",
    description: "After extracting the transactions and saving to another table, the corresponding entry in the block table is removed",

    inputs: {
        block_array: {
            type: ["ref"],
            description: "Array of block elements which was saved"
        },
        transaction_array: {
            type: ["ref"],
            description: "Array of transaction elements which were found in the blocks"
        },
        tokens: {
            type: ["ref"],
            description: "Array of tokens to track for the transactions"
        }
    },

    fn: async function(inputs, exits) {
        var transactionArray = inputs.transaction_array,
            blockArray = inputs.block_array,
            block = null,
            tokens = inputs.token,
            tokenFound = null,
            tokenList = await Token.find(),
            transactionToCreateArray = [];

        _.each(transactionArray, function(transaction) {
            if (transaction.to) {
                transaction.to_lower = transaction.to.toLowerCase();
            } else {
                transaction.to = "";
                transaction.to_lower = "";
            }

            block = _.find(blockArray, {
                hash_lower: transaction.blockHash.toLowerCase()
            });

            if (block) {
                transaction.eth_block = block.id;
                transaction.blockTimestamp = block.timestamp
            }

            transaction.hash_lower = transaction.hash.toLowerCase();
            transaction.blockHash_lower = transaction.blockHash.toLowerCase();
            transaction.from_lower = transaction.from.toLowerCase();

            sails.log.debug("extract-transactions.js (Line: 52) : adding transaction with hash: " + transaction.hash); //debug

            transactionToCreateArray.push(transaction);
        });

        if (transactionToCreateArray.length > 0) {
            await EthTransaction.createEach(transactionToCreateArray);
        }

        return exits.success();
    }
};