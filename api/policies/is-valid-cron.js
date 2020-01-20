/**
 * is-valid-cron
 *
 * A simple policy that allows any cron request with a valid token
 *
 */
module.exports = async function (req, res, proceed) {
    var error = [];

    if (req.body && req.body.auth && req.body.auth.cron_token) {
        if(sails.config.appsettings.cron.valid_cron_token.indexOf(req.body.auth.cron_token) > -1) {
            return proceed();
        }
    }

    error.push("Forbidden");
    
    return res.jsonError(error);
};