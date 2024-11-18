const stripe = require("stripe")(process.env.STRIPE_API_KEY);

module.exports = {
    friendlyName: "Retrieve Stripe balance",
    description: "Retrieves Stripe account balance using the Stripe API.",

    inputs: {},

    fn: async function(inputs, exits) {
        // Grouped variable declaration
        let balance;

        try {
            // Retrieve the balance from the Stripe API
            balance = await stripe.balance.retrieve();

            // Return the retrieved balance
            return exits.success(balance);
        } catch (error) {
            // Handle any errors that occur during the API call
            return exits.error(error);
        }
    }
};