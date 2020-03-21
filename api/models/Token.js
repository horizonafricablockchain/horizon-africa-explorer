/**
 * Token.js
 *
 * @description :: Model to store tokens to be tracked
 * */

module.exports = {
    attributes: {
        address: {
            type: "string",
            maxLength: 100,
            required: true
        },
        decimals: {
            type: "number",
            required: true
        },
        token_type: {
            type: "string",
            maxLength: 50,
            isIn: ["ERC20", "custom"],
            defaultsTo: "ERC20"
        }
    },
    constants: {
        token_type: {
            erc20: "ERC20",
            custom: "custom"
        }
    }
};