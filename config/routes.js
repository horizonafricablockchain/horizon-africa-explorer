module.exports.routes = {
    'POST /client': { action: 'client/create-client' },
    'GET /client/:id': { action: 'client/read-client' },
    'PUT /client/:id': { action: 'client/update-client' },
    'DELETE /client/:id': { action: 'client/delete-client' }
};