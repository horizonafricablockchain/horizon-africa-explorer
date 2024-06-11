module.exports.routes = {
    // Other route definitions

    'GET /block/:block_number': {
        controller: 'block/get-block-by-number',
        action: 'fn'
    },

    // Additional routes as needed
};