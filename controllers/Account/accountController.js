const service = require("../../models/Services/Account");
const history = require("../History/historyController")
const jwt = require('jsonwebtoken')

const generateTokens = (id) => {

    // Create JWT
    const accessToken = jwt.sign({ id: id },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '5m',
        }
    )

    const refreshToken = jwt.sign({ id: id },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h',
        }
    )

    return { accessToken, refreshToken }
}

/*const updateRefreshToken = (username, refreshToken) => {
    users = users.map(user => {
        if (user.username === username)
            return {
                ...user,
                refreshToken
            }

        return user
    })
}*/
const add = (id_covid_manager) => {
    const acc = {
        id_covid_manager: id_covid_manager,
        total_money: 0
    };
    service.addAccount(acc)
};

const find = async(req, res) => {
    const id = req.body.id
    service.findByCovidServerId
    const account = await service.findByCovidServerId(id)
        //console.log(id)
    console.log(account[0])

    if (account == null || account[0] == undefined)
        add(id)
    const tokens = generateTokens(id)
        //updateRefreshToken(id, tokens.refreshToken)

    res.json(tokens)

};
const deleteAccount = async(req, res) => {
    const id = req.body.id

};

const updateMoney = async(req, res) => {
    const id = req.id
    const money = parseInt(req.body.Money, 10);


    var acc = await service.findByCovidServerId(id);
    if (acc != null && acc[0] != undefined) {
        acc = acc[0];
        history.add(id, money)
        const newMoney = money + parseInt(acc.total_money, 10)
        service.updateMoney(acc, newMoney);
    }
    console.log(acc);
}

module.exports = { add, updateMoney, find, deleteAccount };