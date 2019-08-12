/**
 * EthAddress.js
 *
 * @description :: Model to store created ethereum address
 */

module.exports = {
    attributes: {
        node: {
            model: "EthereumNode",
            required: true
        },
        user: {
            model: "User",
            required: true
        },
        address: {
            type: "string",
            required: true
        },
        private_key: {
            type: "string",
            required: true
        }
    }
};