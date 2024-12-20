module.exports = {
    friendlyName: 'Delete Client',
    description: 'Delete a client record.',

    inputs: {
        id: {
            type: 'string',
            required: true,
            description: 'The ID of the client to delete.'
        }
    },

    exits: {
        success: {
            responseType: 'json'
        },
        notFound: {
            responseType: 'notFound',
            description: 'No client with the specified ID was found.'
        }
    },

    fn: async function (inputs, exits) {
        try {
            const deletedClient = await Client.destroyOne({ id: inputs.id });

            if (!deletedClient) {
                return exits.notFound({
                    message: 'Client not found.'
                });
            }

            return exits.success({
                message: 'Client deleted successfully.'
            });
        } catch (error) {
            return exits.notFound({
                message: 'Error deleting client.',
                error: error.message
            });
        }
    }
};