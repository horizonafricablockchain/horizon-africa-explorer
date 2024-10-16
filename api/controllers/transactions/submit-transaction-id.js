/**
 * Controller to handle submission of transaction IDs and retrieve corresponding transaction details.
 * 
 * This controller specifies the expected input structure, outlines response exits, and implements
 * the main logic for processing transaction ID submissions and delivering transaction details or errors.
 */
module.exports = {
    // Assign a human-friendly name to the controller for identification purposes
    friendlyName: "Submit Transaction ID",
    
    // Provide a brief explanation of the controller's functionality
    description: "Processes the transaction ID submitted by the user and retrieves transaction details.",
    
    // Declare the inputs expected by the controller, defining type and validation rules
    inputs: {
        // Transaction ID submitted from the form, expected as a non-empty string
        transaction_id: {
            type: "string",
            required: true // Enforce presence of transaction ID in requests
        }
    },
    
    // Define possible outcomes from the controller's execution and their corresponding actions
    exits: {
        // Standard success response containing retrieved transaction data
        success: {
            responseType: "json" // Format the output as JSON for client-side processing
        },
        // Specific exit when the transaction ID does not correspond to existing records
        notFound: {
            description: 'No transaction with the specified ID was found.',
            responseType: 'notFound' // Issue a 404 response for missing transaction data
        },
        // Response indicating an issue with the incoming transaction ID, such as formatting errors
        badRequest: {
            description: 'Invalid transaction ID provided.',
            responseType: 'badRequest' // Reflect input validation failures back to the client
        },
        // Generic error response to capture unexpected execution issues
        serverError: {
            description: 'A server error occurred during transaction retrieval.',
            responseType: 'serverError' // Default error handling pathway when exceptions arise
        }
    },
    
    // Core function defining the logic executed upon receiving a request with given inputs
    fn: async function(inputs, exits) {
        try {
            // Attempt to fetch transaction details from the system using the provided ID
            const transactionDetails = await TransactionService.getTransactionDetails(inputs.transaction_id);

            // Assess whether any transaction details were returned and handle absence
            if (!transactionDetails) {
                // Exit through the 'not found' path if transaction is missing
                return exits.notFound({ error: 'Transaction not found.' });
            }

            // Successfully relay transaction details back to the requesting client
            return exits.success(transactionDetails);
        } catch (error) {
            // Log error details (if applicable) and revert to a server error response
            return exits.serverError({ error: 'An error occurred while retrieving transaction details.' });
        }
    }
};