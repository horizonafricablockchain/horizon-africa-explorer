module.exports.routes = {
    "get /": {
        action: "views/home"
    },

    "get /block/:block_number": {
        action: "views/block/view-block"
    },

    "get /block/transaction/:block_number": {
        action: "views/transaction/view-block-transactions"
    },

    "get /transaction/:transaction_hash": {
        action: "views/transaction/view-transaction"
    },

    "get /address/:address": {
        action: "views/address/view-address"
    },

    "get /token/list": {
        action: "views/token/view-token-list"
    },

    "get /token/transaction/:address": {
        action: "views/token/view-token-transaction"
    },


    /* CRONS */
    "post /cron/scan-blocks": {
        action: "cron/scan-blocks"
    },

    "post /cron/extract-token-transaction": {
        action: "cron/extract-token-transaction"
    },


    /* API */
    /* TRANSACTIONS API */
    "post /api/v1/transaction/list": {
        action: "transaction/list-transaction"
    },

    "post /api/v1/transaction/count": {
        action: "transaction/count-transaction"
    },

    "post /api/v1/token-transaction/list": {
        action: "token-transaction/list-token-transaction"
    },

    /* TOKEN API */
    "post /api/v1/token/add": {
        action: "token/add-token"
    },

    /* BLOCKS API */
    "post /api/v1/block-tracker/list-block-tracker": {
        action: "block-tracker/list-block-tracker"
    },

    "post /api/v1/eth-block/list-eth-block": {
        action: "eth-block/list-eth-block"
    },

    "post /api/v1/validator/list-validator": {
        action: "validator/list-validator"
    },

    "post /api/v1/eth-block/count-eth-block": {
        action: "eth-block/count-eth-block"
    },

    "post /api/v1/token/list-token": {
        action: "token/list-token"
    },

    "post /api/v1/token/count-token": {
        action: "token/count-token"
    },
};