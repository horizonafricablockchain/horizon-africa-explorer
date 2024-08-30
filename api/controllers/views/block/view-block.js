module.exports = {
    friendlyName: "Displays a block detail page or a list of blocks",
    description: "Displays a block detail page or a paginated list of blocks",
    inputs: {
        block_number: {
            type: "number",
            required: false
        },
        page: {
            type: "number",
            defaultsTo: 1
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/block-list.pug"
        }
    },
    fn: async function(inputs, exits) {
        const BLOCKS_PER_PAGE = 10;

        if (inputs.block_number) {
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
                blocks: [block]
            });
        } else {
            var pageNo = inputs.page || 1;
            var count = await EthBlock.count();
            var blocks = await EthBlock.find({
                skip: (pageNo - 1) * BLOCKS_PER_PAGE,
                limit: BLOCKS_PER_PAGE
            }).sort('number DESC');

            var pagination = {
                currentPage: pageNo,
                totalPages: Math.ceil(count / BLOCKS_PER_PAGE),
                prevPage: pageNo > 1 ? pageNo - 1 : null,
                nextPage: pageNo < Math.ceil(count / BLOCKS_PER_PAGE) ? pageNo + 1 : null,
                pages: Array.from({ length: Math.ceil(count / BLOCKS_PER_PAGE) }, (_, i) => i + 1)
            };

            return exits.success({
                blocks,
                pagination
            });
        }
    }
};