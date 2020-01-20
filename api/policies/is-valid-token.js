/**
 * is-valid-token
 *
 * A simple policy that allows any api request with a valid token
 *
 */
module.exports = async function (req, res, proceed) {
    var error = [];

    if (req.body && req.body.auth && req.body.auth.app_token) {
        if (sails.config.appsettings.allowed_token.indexOf(req.body.auth.app_token) > -1) {
            return proceed();
        }
    }

    error.push("Forbidden");
    
    return res.jsonError(error);
};