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
            async = require("async"),
            transaction = null,
            tokenTransaction = null;

        transactionList = await EthTransaction.find({
                parsed_status: EthTransaction.constants.parsed_status.not_parsed
            })
            .sort("createdAt ASC")
            .limit(sails.config.custom.token_parsing.limit);

        tokenList = await Token.find()
            .sort("createdAt ASC");

        for (var i = 0; i < transactionList.length; i++) {
            transaction = transactionList[i];
            transactionToUpdate.push(transaction.id);

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

        if (tokenTransactionToCreate.length > 0) {
            TokenTransaction.createEach(tokenTransactionToCreate)
                .then(function() {
                    sails.log.debug("parse-token-transaction.js (Line: 54) : created " + tokenTransactionToCreate.length + " token transaction"); //debug
                });
        }

        if (transactionToUpdate.length > 0) {
            EthTransaction.update({
                    id: transactionToUpdate
                })
                .set({
                    parsed_status: EthTransaction.constants.parsed_status.parsed
                })
                .then(function() {
                    sails.log.debug("parse-token-transaction.js (Line: 50) : updated " + transactionToUpdate.length + " transactions to parsed status"); //debug

                    return exits.success();
                });
        } else {
            return exits.success();
        }
    }
};