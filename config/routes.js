module.exports.routes = {
    "get /": {
        action: "views/home"
    },


    /* CRONS */
    "post /cron/scan-blocks": {
        action: "cron/scan-blocks"
    }
};