const isEmpty = require("./isEmpty");

const checkusername = async (data) => {
    let errors = {}

    if (isEmpty(data.username)) {
        errors.username = "Missing Username";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = { checkusername };
