/**
 * Controller to handle the submission and processing of transaction IDs
 * Users enter a transaction ID, and this controller fetches the details
 * associated with that transaction.
 *
 * Steps Involved:
 * 1. Extract the transaction ID from the request
 * 2. Validate the transaction ID input
 * 3. Fetch transaction details from the blockchain
 * 4. Handle scenarios where transaction details are not found
 * 5. Return the transaction details as a JSON response
 * 6. Manage unexpected errors with appropriate error message
 */
module.exports = async function submitTransactionId(req, res) {
  // Step 1: Extract the transaction ID from the form submission
  const transactionId = req.body.transaction_id;

  try {
    // Step 2: Validate that transactionId is provided
    // Return an error response if the transaction ID is missing
    if (!transactionId) {
      return res.badRequest({ error: 'Transaction ID is required.' });
    }

    // Step 3: Fetch transaction details using existing functionality
    // Utilize the TransactionService to obtain transaction information
    const transactionDetails = await TransactionService.getTransactionDetails(transactionId);

    // Step 4: Check if transaction details were found
    // If no details are found, respond with a 'not found' error
    if (!transactionDetails) {
      return res.notFound({ error: 'Transaction not found.' });
    }

    // Step 5: Respond with the transaction details
    // Send the retrieved transaction details back to the client as a JSON response
    return res.json(transactionDetails);
  } catch (error) {
    // Step 6: Log and handle any unexpected errors
    // Return a server error response with a generic error message
    return res.serverError({ error: 'An error occurred while retrieving transaction details.' });
  }
};