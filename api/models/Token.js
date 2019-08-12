/**
 * Token.js
 *
 * @description :: Model to store tokens to be tracked
 * */

module.exports = {
    attributes: {
        address: {
            type: "string",
            required: true
        },
        decimals: {
            type: "number",
            required: true
        },
        token_type: {
            type: "string"
        }
    },
    constants: {
        token_type: {
            erc20: "ERC20"
        }
    }
};