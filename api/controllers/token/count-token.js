module.exports = {
    friendlyName: "Retrieve count of Tokens based on query parameters",
    description: "Retrieve count of Tokens based on query parameters",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    to_lower: "0x8fbb9d871234c8d7ff0846035bbb3ddf7097a489"
                }
            }
        },
        auth: {
            type: {},
            example: {
                app_token: ""
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        var error = [],
            searchCriteria = {},
            tokenCount = 0;

        try {
            if (inputs.data && inputs.data.search_criteria) {
                searchCriteria = inputs.data.search_criteria;
            }

            tokenCountResponse = await sails.helpers.utilities.haApiUtility("/api/v1/token/count", "POST", {});

            if (tokenCountResponse && tokenCountResponse.data) {
                tokenCount = tokenCountResponse.data;
            }
            
            exits.success({
                data: tokenCount
            });

        } catch (err) {
            sails.log.debug(err);
            error.push("An error occurred");

            exits.jsonError(error);
        }
    }
}