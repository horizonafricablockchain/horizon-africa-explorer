module.exports = {
    attributes: {
        author: {
            type: 'string'
        },
        difficulty: {
            type: 'number'
        },
        extraData: {
            type: 'string'
        },
        gasLimit: {
            type: 'number'
        },
        gasUsed: {
            type: 'number'
        },
        hash: {
            type: 'string'
        },
        hash_lower: {
            type: 'string'
        },
        logsBloom: {
            type: 'string'
        },
        miner: {
            type: 'string'
        },
        mixHash: {
            type: 'string'
        },
        nonce: {
            type: 'string'
        },
        number: {
            type: 'number'
        },
        parentHash: {
            type: 'string'
        },
        parentHash_lower: {
            type: 'string'
        },
        receiptsRoot: {
            type: 'string'
        },
        sha3Uncles: {
            type: 'string'
        },
        size: {
            type: 'number'
        },
        stateRoot: {
            type: 'string'
        },
        timestamp: {
            type: 'number'
        },
        totalDifficulty: {
            type: 'number'
        },
        transactionsRoot: {
            type: 'string'
        },
        transactions: {
            collection: 'ethtransaction',
            via: 'blockNumber'
        }
    }
};