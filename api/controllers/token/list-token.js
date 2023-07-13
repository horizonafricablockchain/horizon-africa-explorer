module.exports = {
    friendlyName: "Retrieve list of Tokens based on query and pagination parameters",
    description: "Retrieve list of Tokens based on query and pagination parameters",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    token_type: "01"
                },
                pagination: {
                    skip: 50,
                    limit: 25
                },
                sort: [{
                    createdAt: "ASC",
                }, {
                    blockNumber: "DESC"
                }]
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
            transactionList = [],
            searchCriteria = {},
            skip = 0,
            limit = sails.config.appsettings.record.limit,
            sort = "",
            list = [],
            findPromise = null,
            pagination = null,
            tokenListResponse = null,
            sort = [{
                name: "ASC"
            }],
            post = null;

        try {
            if (inputs.data && inputs.data.search_criteria) {
                searchCriteria = inputs.data.search_criteria;
            }

            if (inputs.data && inputs.data.pagination) {
                pagination = inputs.data.pagination;
            }
            
            if (inputs.data && inputs.data.sort) {
                sort = sort.push(...inputs.data.sort)
            }

            tokenListResponse = await sails.helpers.utilities.haApiUtility("/api/v1/token/list", "POST", {
                search_criteria: searchCriteria,
                // pagination: pagination,
                sort: sort
            });

            if (tokenListResponse && tokenListResponse.data) {
                findPromise = tokenListResponse.data;
            }

            list = await findPromise;

            exits.success({
                data: list
            });
        } catch (err) {
            sails.log.debug(err);
            error.push("An error occurred");

            exits.jsonError(error);
        }
    }
}