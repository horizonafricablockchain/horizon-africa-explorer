module.exports = {
    friendlyName: "List Blocks",
    description: "Displays a list of blocks with pagination",
    inputs: {
        page: {
            type: 'number',
            defaultsTo: 1
        },
        limit: {
            type: 'number',
            defaultsTo: 10
        }
    },
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "views_moltran/pages/block/list-blocks.pug"
        }
    },
    fn: async function(inputs, exits) {
        const skip = (inputs.page - 1) * inputs.limit;
        const blocks = await EthBlock.find().sort('number DESC').skip(skip).limit(inputs.limit);
        const totalBlocks = await EthBlock.count();

        const pagination = {
            page: inputs.page,
            limit: inputs.limit,
            totalItems: totalBlocks,
            totalPages: Math.ceil(totalBlocks / inputs.limit),
            previousPage: inputs.page > 1 ? inputs.page - 1 : null,
            nextPage: inputs.page < Math.ceil(totalBlocks / inputs.limit) ? inputs.page + 1 : null,
            previousPageLink: inputs.page > 1 ? `/block/list?page=${inputs.page - 1}&limit=${inputs.limit}` : null,
            nextPageLink: inputs.page < Math.ceil(totalBlocks / inputs.limit) ? `/block/list?page=${inputs.page + 1}&limit=${inputs.limit}` : null,
            pageNumbers: Array.from({ length: Math.ceil(totalBlocks / inputs.limit) }, (v, k) => ({
                number: k + 1,
                link: `/block/list?page=${k + 1}&limit=${inputs.limit}`,
                active: inputs.page === k + 1
            }))
        };

        return exits.success({
            blocks: blocks,
            pagination: pagination
        });
    }
};