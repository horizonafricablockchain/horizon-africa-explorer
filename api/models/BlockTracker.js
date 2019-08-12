/**
 * BlockTracker.js
 *
 * @description :: Model to store tracking of blocks
 */

module.exports = {
    attributes: {
        type: {
            type: "string",
            isIn: ["BTC", "ETH"],
            required: true
        },
        block_number: {
            type: "number",
            required: true
        },
        eth_current_block: {
            type: "number"
        },
        /**
        * additional_data is in the form:
            additional_data: {
                skip: 5
            }
        */
        additional_data: {
            type: "json",
            required: false
        }
    },
    constants: {
        type: {
            eth: "ETH",
            btc: "BTC"
        }
    }
};