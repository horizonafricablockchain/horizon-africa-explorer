module.exports = {
    friendlyName: 'Read Client',
    description: 'Get details of a specific client.',

    inputs: {
        id: {
            type: 'string',
            required: true,
            description: 'The ID of the client to retrieve.'
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
            const client = await Client.findOne({ id: inputs.id });

            if (!client) {
                return exits.notFound({
                    message: 'Client not found.'
                });
            }

            return exits.success({
                message: 'Client retrieved successfully.',
                data: client
            });
        } catch (error) {
            return exits.notFound({
                message: 'Error retrieving client.',
                error: error.message
            });
        }
    }
};