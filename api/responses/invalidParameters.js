module.exports = function jsonOk(params) {
    this.res.jsonError([this.req.i18n.__("common.invalid_parameters")]);
}