const Stripe = require("stripe");

module.exports = {
    friendlyName: "Retrieve Stripe Balance",
    description: "Fetches the balance information from Stripe without any input parameters.",

    inputs: {},

    fn: async function(inputs, exits) {
        // Declare variables at the top using snake_case
        const stripe_api_key = sails.config.stripe.apiKey;
        const stripe = Stripe(stripe_api_key);

        try {
            // Retrieve balance from Stripe
            const balance = await stripe.balance.retrieve();
            return exits.success(balance);
        } catch (error) {
            // Return error if the API call fails
            return exits.error(error);
        }
    }
};