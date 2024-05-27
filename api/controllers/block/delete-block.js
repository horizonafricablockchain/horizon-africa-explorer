module.exports = {
    //add comments here
    // add more comments
    friendlyName: 'Delete block',
    description: 'Deletes block based on block number',
    inputs: {
        block_number: {
            type: 'number',
            required: true
        }
    },
    exits: {
        success: {
            responseType: 'jsonOk'
        },
        notFound: {
            responseType: 'notFound'
        },
        jsonError: {
            responseType: 'jsonError'
        }
    },
    fn: async function(inputs, exits) {
        try {
            const block = await EthBlock.findOne({ number: inputs.block_number });
            if (!block) {
                return exits.notFound({ message: 'Block not found' });
            }
            await EthBlock.destroy({ id: block.id });
            return exits.success({ message: 'Block deleted successfully' });
        } catch (err) {
            sails.log.error(err);
            return exits.jsonError({ message: 'An error occurred', error: err.message });
        }
    }
};