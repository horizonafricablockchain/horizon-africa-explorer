module.exports = function jsonError(errorArray) {
    this.res.status(200);

    if (errorArray) {
        this.res.json({
            success: false,
            error: errorArray
        });
    } else {
        this.res.json({
            success: false,
            error: [this.req.i18n.__("error.general_error")]
        });
    }

}