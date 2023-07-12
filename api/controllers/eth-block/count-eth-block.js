module.exports = {
    friendlyName: "Retrieve count of EthBlock based on query parameters",
    description: "Retrieve count of EthBlock based on query parameters",
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
            ethBlockCount = 0;

        try {
            if (inputs.data && inputs.data.search_criteria) {
                searchCriteria = inputs.data.search_criteria;
            }

            ethBlockCount = await EthBlock.count(searchCriteria);
            
            exits.success({
                data: ethBlockCount
            });

        } catch (err) {
            sails.log.debug(err);
            error.push("An error occurred");

            exits.jsonError(error);
        }
    }
}