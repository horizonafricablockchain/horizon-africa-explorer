module.exports = function jsonOk(params) {
    if (!params.successMessage) {
        params.successMessage = this.req.i18n.__("common.success_message");
    }

    if (params.data) {
        this.res.json({
            success: true,
            successMessage: params.successMessage,
            data: params.data
        });
    } else {
        this.res.json({
            success: true,
            successMessage: params.successMessage
        });
    }
}