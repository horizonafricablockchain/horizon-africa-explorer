// Import the EthTransaction model for accessing transactions
const EthTransaction = require('../../../models/EthTransaction');

module.exports = {

    // Method to handle the transaction form submission by the user
    handleTransactionFormSubmission: async function(req, res) {
        // Group all variable declarations at the top
        const transaction_id = req.body.transaction_id;
        let transaction;

        try {
            // Retrieve the transaction details using the transaction ID
            transaction = await EthTransaction.findOne({ hash: transaction_id });

            // Render the transaction form page with the transaction details
            return res.view(
                'views_moltran/pages/transaction/transaction-form',
                { transaction: transaction || null }
            );
        } catch (error) {
            // Log any error that occurs during retrieval
            sails.log.error('Error retrieving transaction:', error);

            // Render the page with an null transaction object if an error occurs
            return res.view(
                'views_moltran/pages/transaction/transaction-form',
                { transaction: null }
            );
        }
    }
};