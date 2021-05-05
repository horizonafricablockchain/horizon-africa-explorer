module.exports = {
    friendlyName: "Displays the list of tokens",
    description: "Displays the list of tokens",
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/token/view-token-list.pug"
        }
    },
    fn: async function(inputs, exits) {
        var tokenListResponse = await sails.helpers.utilities.haApiUtility("/api/v1/token/list", "POST", {
                sort: [{
                    name: "ASC"
                }]
            }),
            tokenList = [];

        if (tokenListResponse && tokenListResponse.data) {
            tokenList = tokenListResponse.data;
        }

        return exits.success({
            token_list: tokenList
        });
    }
}