module.exports = {
    friendlyName: "Scans transactions in database and extract token transactions",
    description: "Scans transactions in database and extract token transactions",
    inputs: {},
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        await sails.helpers.token.parseTokenTransaction();

        return exits.success({
            message: "extract-token-transaction completed"
        });
    }
}