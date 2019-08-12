/**
 * EthereumNode.js
 *
 * @description :: Model to store details of ethereum nodes to which this application connects to
 */

module.exports = {
    attributes: {
        api_url: {
            type: "string",
            required: true,
            maxLength: 50
        },
        status: {
            type: "string",
            isIn: ["active", "inactive"],
            required: true
        }
    },
    constants: {
        status: {
            active: "active",
            inactive: "inactive"
        }
    }
};