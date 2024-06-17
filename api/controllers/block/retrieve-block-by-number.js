module.exports = {
    friendlyName: 'Retrieve Block by Number',
    description: 'Retrieve block details based on the block number',

    inputs: {
        blockNumber: {
            type: 'number',
            required: true,
            description: 'The block number to search for'
        }
    },

    exits: {
        success: {
            responseType: 'json'
        },
        notFound: {
            responseType: 'notFound',
            description: 'No block with the specified number was found.'
        }
    },

    fn: async function (inputs, exits) {
        try {
            const blockDetails = await EthBlock.findOne({ number: inputs.blockNumber });

            if (!blockDetails) {
                return exits.notFound({
                    message: 'No block found with the specified block number.'
                });
            }

            return exits.success(blockDetails);
        } catch (error) {
            sails.log.error(error);
            return exits.error({
                message: 'An error occurred while retrieving the block details.'
            });
        }
    }
};