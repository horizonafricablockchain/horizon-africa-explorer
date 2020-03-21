module.exports.apperrors = {
    general: {
        unknown_error: {
            code: 5100,
            message: "An error occurred, please refresh and try again"
        },
        invalid_parameters: {
            code: 5101,
            message: "Invalid parameters"
        },
        forbidden_error: {
            code: 5102,
            message: "Invalid app token"
        },
        forbidden_cron_error: {
            code: 5102,
            message: "Invalid cron token"
        },
        blocked_ip: {
            code: 5103,
            message: "Your IP has been blocked. Please retry in 5 minutes"
        },
        blocked_user: {
            code: 5104,
            message: "This user has displayed suspicious activity. The account has been blocked."
        }
    },
    token: {
        address_already_exists: {
            code: 5200,
            message: "Token address already exists"
        }
    }
};