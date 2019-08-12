module.exports = {
    friendlyName: "Calls getBlock from web3 library",
    description: "Gets all details about blocks including transactions and transaction details",

    inputs: {
        blockNumber: {
            type: "number",
            example: 10,
            description: "The block to retrieve using the web3 library",
            required: true
        },
        returnFullObject: {
            type: "boolean",
            description: "Whether to return the full object or only limited objects",
            required: true
        }
    },

    fn: async function(inputs, exits) {
        var node = await sails.helpers.node.getReadNode();
        var blockDetails = await sails.helpers.utilities.apiUtility("/block/get-block", "POST", {
            block_number: inputs.blockNumber,
            full_object: true
        });

        return exits.success(blockDetails);
    }
};