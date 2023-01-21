const bcrypt = require('bcrypt');

const model = require('../models/_userModel');
const utils = require('../middlewares/utils');

const createUser = async (req, res) => {
    await bcrypt.hash(req.body.password.toString(), 12)
        .then(hash => {
            req.body.password = hash;
        });
    const answer = await model.createUser(req.body);
    if(answer.status == "ok") return res.status(201).json(answer);
    if(answer.message == "Username taken") return res.status(403).json(answer);
    return res.status(500).json(answer);
}

const getUser = async (req, res) => {
    const answer = await model.getUser(req.body);

    if(answer.status == "ok") {
        const {lastAccess, password, ...user} = answer.data;

        if(!await utils.validateUser(req.body.password, password)) {
            return res.status(401).json({status: "error", message: "Wrong password"});
        }

        await bcrypt.hash(`${password}${lastAccess}`, 12)
            .then(hash => {
                user.hash = hash;
            });
        answer.data = [user];

        return res.status(200).json(answer);
    }
    
    return res.status(500).json(answer);
}

module.exports = {
    createUser,
    getUser
}