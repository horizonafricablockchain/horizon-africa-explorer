module.exports = {
    friendlyName: "Retrieve list of token transactions based on query and pagination parameters",
    description: "Retrieve list of token transactions based on query and pagination parameters",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    to_lower: "0x8fbb9d871234c8d7ff0846035bbb3ddf7097a489"
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
            limit = 0,
            sort = "",
            findPromise = null,
            post = null;

        try {
            if (inputs.data && inputs.data.search_criteria) {
                searchCriteria = inputs.data.search_criteria;
            }

            findPromise = TokenTransaction.find(searchCriteria);

            if (inputs.data && inputs.data.pagination) {
                if (inputs.data.pagination.skip) {
                    skip = inputs.data.pagination.skip;
                }

                if (inputs.data.pagination.limit) {
                    limit = inputs.data.pagination.limit;
                }

                findPromise.skip(skip).limit(limit);
            }

            if (inputs.data && inputs.data.sort) {
                findPromise.sort(inputs.data.sort);
            }

            findPromise.then(function(array) {
                exits.success({
                    data: array
                });
            });
        } catch (err) {
            sails.log.debug(err);
            error.push("An error occurred");

            exits.jsonError(error);
        }
    }
}