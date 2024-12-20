module.exports = {
    friendlyName: 'Create Client',
    description: 'Create a new client record.',

    inputs: {
        name: {
            type: 'string',
            required: true,
            description: 'The name of the client.'
        },
        email: {
            type: 'string',
            required: true,
            isEmail: true,
            description: 'A valid email address for the client.'
        },
        phone: {
            type: 'string',
            description: 'Contact number of the client.'
        }
    },

    exits: {
        success: {
            responseType: 'json'
        },
        invalid: {
            responseType: 'badRequest',
            description: 'Invalid data was provided.'
        }
    },

    fn: async function (inputs, exits) {
        try {
            const newClient = await Client.create({
                name: inputs.name,
                email: inputs.email,
                phone: inputs.phone
            }).fetch();

            return exits.success({
                message: `Client created successfully.`,
                data: newClient
            });
        } catch (error) {
            return exits.invalid({
                message: 'Failed to create client.',
                error: error.message
            });
        }
    }
};