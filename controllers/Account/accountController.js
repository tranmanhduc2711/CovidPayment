const service = require("../../models/Services/Account");
const history = require("../History/historyController")
const jwt = require('jsonwebtoken')
const max_debt = -100000000
const admin_id = '1'
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
const add = async(req, res) => {
    const id = req.body.id
    const account = await service.findByCovidServerId(id)
    if (account == null || account[0] == undefined) {
        const acc = {
            id_covid_manager: id,
            total_money: 0
        };
        service.addAccount(acc)
        res.sendStatus(201)

    } else {
        res.sendStatus(405)
    }

};

const login = async(req, res) => {
    const id = req.body.id
    service.findByCovidServerId
    const account = await service.findByCovidServerId(id)
    console.log(account[0])

    if (account == null || account[0] == undefined)
        res.sendStatus(401)
    else {
        const tokens = generateTokens(id)
            //updateRefreshToken(id, tokens.refreshToken)

        res.json(tokens)
    }


};
const deleteAccount = async(req, res) => {
    const id = req.body.id


};
const find = async(req, res) => {
    const account = await service.findAccountHaveMaxDebt()
    res.json(account)
};
const findID = async(req, res) => {
    const id = req.params.id
    const account = await service.findByCovidServerId(id)
    if (account == null || account[0] == undefined) {
        res.status(405)
    } else {
        res.json(account[0])

    }
};
const updateMoney = async(req, res) => {
    const id = req.id
    const money = parseInt(req.body.Money, 10);


    var acc = await service.findByCovidServerId(id);
    if (acc != null && acc[0] != undefined) {
        acc = acc[0];
        const newMoney = money + parseInt(acc.total_money, 10)
        if (newMoney >= max_debt) {
            history.add(id, money)
            service.updateMoney(acc, newMoney);
            if (money < 0) {
                var admin = await service.findById(admin_id);
                console.log(admin)
                service.updateMoney(admin, parseInt(admin.total_money, 10) - money);

            }

            res.sendStatus(201)
        } else {
            res.sendStatus(405)
        }
    } else {
        res.sendStatus(405)

    }
    console.log(acc);
}

module.exports = { add, updateMoney, deleteAccount, login, find, findID };