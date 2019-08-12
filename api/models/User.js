/**
 * User.js
 *
 * @description :: Model to store details for users
 */

module.exports = {
    attributes: {
        user_id: {
            type: "string",
            required: true
        },
        digital_ocean_token: {
            type: "string",
            required: false
        }
    }
};