/**
 * AccessToken.js
 *
 * @description :: Model to store access tokens for users
 */

module.exports = {
    attributes: {
        user_id: {
            model: "User",
            required: true
        },
        api_key: {
            type: "string",
            required: true,
            maxLength: 200
        },
        api_secret: {
            type: "string",
            required: true,
            maxLength: 200
        }
    }
};