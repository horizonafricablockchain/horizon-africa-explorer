module.exports.routes = {
    "get /": {
        action: "views/home"
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

    "post /api/v1/token-transaction/list": {
        action: "token-transaction/list-token-transaction"
    },

    /* TOKEN API */
    "post /api/v1/token/add": {
        action: "token/add-token"
    }
};