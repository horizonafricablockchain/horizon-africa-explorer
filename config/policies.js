module.exports.policies = {

    // '*': true,

    "cron/scan-blocks": "is-valid-cron",
    
    "transaction/list-transaction": "is-valid-token",

};