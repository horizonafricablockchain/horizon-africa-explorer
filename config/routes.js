module.exports.routes = {
    "get /": {
        action: "views/home"
    },


    /* CRONS */
    "post /cron/scan-blocks": {
        action: "cron/scan-blocks"
    },

    /* API */
    "post /api/v1/transaction/list": {
        action: "transaction/list-transaction"
    }
};