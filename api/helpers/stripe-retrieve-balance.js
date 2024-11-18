module.exports = {
    friendlyName: "Retrieve Stripe balance",
    description: "Retrieves the current balance from Stripe",

    inputs: {},

    fn: async function(inputs, exits) {
        const stripe = require('stripe')(sails.config.stripe.secretKey);

        try {
            const balance = await stripe.balance.retrieve();
            return exits.success(balance);
        } catch (error) {
            return exits.error(error);
        }
    }
};