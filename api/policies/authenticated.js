module.exports = async function(req, res, proceed) {
    // Check if the user is authenticated
    if (req.session.userId) {
        return proceed(); // Proceed to the next policy or controller
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.unauthorized();
};