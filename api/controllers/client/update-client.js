module.exports = {
    friendlyName: 'Update Client',
    description: 'Update a client\'s details.',

    inputs: {
        id: {
            type: 'string',
            required: true,
            description: 'The ID of the client to update.'
        },
        name: {
            type: 'string',
            description: 'The new name of the client.'
        },
        email: {
            type: 'string',
            isEmail: true,
            description: 'The new email address for the client.'
        },
        phone: {
            type: 'string',
            description: 'The new contact number of the client.'
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
            const updatedClient = await Client.updateOne({ id: inputs.id })
                .set({
                    name: inputs.name,
                    email: inputs.email,
                    phone: inputs.phone
                });

            if (!updatedClient) {
                return exits.notFound({
                    message: 'Client not found.'
                });
            }

            return exits.success({
                message: 'Client updated successfully.',
                data: updatedClient
            });
        } catch (error) {
            return exits.notFound({
                message: 'Error updating client.',
                error: error.message
            });
        }
    }
};