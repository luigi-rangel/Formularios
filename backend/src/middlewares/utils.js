const bcrypt = require('bcrypt');

const validateFields = (fields, area) => {
    let valid = true;
    let message = [];

    for(let item in fields){
        if(!(fields[item] in area && area[fields[item]])){
            valid = false;
            message.push(`field '${fields[item]}' is required and can not be empty.`);
        }
    }

    return {valid, message};
}

const validateFieldTypes = (fields, types, body) => {
    let valid = true;
    let message = [];

    for(let i = 0; i < fields.length; i++){
        if(!(typeof body[fields[i]] == types[i])){
            valid = false;
            message.push(`field '${fields[i]}' expected to be ${types[i]}`);
        }
    }

    return { valid, message };
}

const validateUser = async (string, hash) => {
    return await bcrypt.compare(string, hash);
}

module.exports = {
    validateFields,
    validateFieldTypes,
    validateUser
}