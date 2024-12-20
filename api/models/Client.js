/**
 * Client.js
 *
 * @description :: Model for storing client details
 */

module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true
        },
        email: {
            type: "string",
            isEmail: true,
            required: true,
            unique: true
        },
        phone: {
            type: "string",
            required: false
        }
    }
};