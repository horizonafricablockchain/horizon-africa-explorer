module.exports = {
    friendlyName: "Displays a block detail page",
    description: "Displays a block detail page",
    inputs: {
        block_number: {
            type: "number",
            required: true
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/view-block.pug"
        }
    },
    fn: async function(inputs, exits) {
        var blockList = await EthBlock.find({
                number: inputs.block_number
            }),
            block = null,
            validatorList = [],
            validator = null;

        if (blockList && blockList[0]) {
            block = blockList[0];

            validatorList = await Validator.find({
                address: block.miner
            });

            if (validatorList && validatorList[0]) {
                block.validator = validatorList[0];
            }

            block.number_transactions = await EthTransaction.count({
                eth_block: block.id
            });
        }

        return exits.success({
            block: block
        });
    }
};

module.exports.redirectToList = async function (req, res) {
    return res.redirect('/block/list');
};