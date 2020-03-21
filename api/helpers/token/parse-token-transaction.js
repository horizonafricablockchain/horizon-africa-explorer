module.exports = {
    friendlyName: "Parses token transactions",
    description: "Retrieves unparsed transactions in the database and parses them to check if they include any token transactions such as transfer, etc.",

    inputs: {},

    fn: async function(inputs, exits) {
        var transactionList = [],
            tokenList = [],
            input = "",
            transactionToken = null,
            transactionToUpdate = [],
            tokenTransactionToCreate = [],
            transaction = null,
            tokenTransaction = null;

        transactionList = await EthTransaction.find({
                parsed_status: EthTransaction.constants.parsed_status.not_parsed
            })
            .sort("createdAt ASC")
            .limit(sails.config.custom.token.parsing_limit);

        if (transactionList.length > 0) {
            transactionToUpdate = _.map(transactionList, "id");

            await EthTransaction.update({
                id: transactionToUpdate
            }, {
                parsed_status: EthTransaction.constants.parsed_status.parsing
            });

            tokenList = await Token.find()
                .sort("createdAt ASC");

            for (var i = 0; i < transactionList.length; i++) {
                transaction = transactionList[i];

                if (transaction.to && transaction.to != "") {
                    transactionToken = _.find(tokenList, {
                        address: transaction.to_lower
                    });

                    if (transactionToken) {
                        tokenTransaction = await sails.helpers.eth.decodeEthInput(transaction, transactionToken);
                        tokenTransactionToCreate.push(tokenTransaction);
                    }
                }
            }
        }

        if (tokenTransactionToCreate.length > 0) {
            await TokenTransaction.createEach(tokenTransactionToCreate);

            await EthTransaction.update({
                id: transactionToUpdate
            }, {
                    parsed_status: EthTransaction.constants.parsed_status.parsed
            });

            sails.log.debug("parse-token-transaction.js (Line: 61) : tokenTransactionToCreate");//debug
            sails.log.debug(tokenTransactionToCreate);//debug
        }

        return exits.success();
    }
};