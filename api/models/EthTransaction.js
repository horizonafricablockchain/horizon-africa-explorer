/**
 * EthTransaction.js
 *
 * @description :: Model for Ethereum Transactions
 */

module.exports = {
    attributes: {
        eth_block: {
            model: "EthBlock"
        },
        blockHash: {
            type: "string"
        },
        blockHash_lower: {
            type: "string"
        },
        blockNumber: {
            type: "number"
        },
        blockTimestamp: {
            type: "number"
        },
        to: {
            type: "string",
            required: false
        },
        to_lower: {
            type: "string"
        },
        from: {
            type: "string"
        },
        from_lower: {
            type: "string"
        },
        gas: {
            type: "number"
        },
        gasPrice: {
            type: "number"
        },
        hash: {
            type: "string"
        },
        hash_lower: {
            type: "string"
        },
        input: {
            type: "string"
        },
        nonce: {
            type: "number"
        },
        transactionIndex: {
            type: "number"
        },
        value: {
            type: "string"
        },
        v: {
            type: "string"
        },
        r: {
            type: "string"
        },
        s: {
            type: "string"
        },
        parsed_status: {
            type: "string",
            isIn: ["not_parsed", "parsed", "error_parsing"],
            defaultsTo: "not_parsed"
        }
    },
    constants: {
        parsed_status: {
            not_parsed: "not_parsed",
            parsed: "parsed",
            error_parsing: "error_parsing"
        }
    }
};