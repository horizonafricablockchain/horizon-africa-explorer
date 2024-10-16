module.exports = {
    friendlyName: "Get latest 10 blocks",
    description: "Retrieve the latest 10 blocks from the EthBlock model sorted by createdAt date",
    
    inputs: {},
    
    exits: {
        success: {
            description: "Returns the latest 10 blocks"
        }
    },
    
    fn: async function(inputs, exits) {
        // Purpose: This helper function retrieves the latest 10 Ethereum blocks from the database.
        // Logic: It queries the EthBlock model, sorts the entries by the createdAt date in descending order,
        // and limits the result to the 10 most recent blocks.
        let latestBlockList;
        try {
            latestBlockList = await EthBlock.find({}).sort('createdAt DESC').limit(10);
            return exits.success(latestBlockList);
        } catch (error) {
            // Handle any errors that occur during the retrieval of blocks
            return exits.error(error);
        }
    }
};