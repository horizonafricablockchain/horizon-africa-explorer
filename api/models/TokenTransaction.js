/**
 * TokenTransaction.js
 *
 * @description :: Model to store token transactions
 * */

module.exports = {
    attributes: {
        token: {
            model: "Token",
            required: true
        },
        transaction: {
            model: "EthTransaction",
            required: true
        },
        token_address: {
            type: "string"
        },
        fromAddress: {
            type: "string"
        },
        fromAddress_lower: {
            type: "string"
        },
        toAddress: {
            type: "string"
        },
        toAddress_lower: {
            type: "string"
        },
        amountTokens: {
            type: "number"
        },
        // the amount of tokens divided by the number of decimals for the token
        amountTokens_absolute: {
            type: "number"
        },
        transactionName: {
            type: "string"
        },
        transaction_hash: {
            type: "string",
            unique: true
        },
        block_number: {
            type: "number"
        },
        block_timestamp: {
            type: "number"
        }
    },
    constants: {
        transactionName: {
            transfer: "transfer"
        }
    }
};