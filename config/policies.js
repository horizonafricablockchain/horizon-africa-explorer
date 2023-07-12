module.exports.policies = {

    // '*': true,

    "cron/scan-blocks": "is-valid-cron",
    
    "transaction/list-transaction": "is-valid-token",

    "transaction/count-transaction": "is-valid-token",

    "block-tracker/list-block-tracker": "is-valid-token",

    "eth-block/list-eth-block": "is-valid-token",

    "validator/list-validator": "is-valid-token",

    "eth-block/count-eth-block": "is-valid-token",

    "token/list-token": "is-valid-token",

    "token/count-token": "is-valid-token",

};