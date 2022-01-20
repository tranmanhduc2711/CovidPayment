const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../index");
const max_debt = -100
async function test() {
    const t = await models.Account.findAll({ raw: true });
    console.log(t);
    return t;
}


const addAccount = async(account) => {
    try {
        await models.Account.create({
            id_covid_manager: account.id_covid_manager,
            total_money: account.total_money,
        });
    } catch (err) {
        console.log(err);
    }
};
const updateMoney = async(account, money) => {
    try {
        await models.Account.update({
            total_money: money,
        }, {
            where: {
                id: account.id
            }
        })

    } catch (err) {
        console.log(err);
    }
}
const findByCovidServerId = async(id) => {
    try {
        return await models.Account.findAll({
            where: {
                id_covid_manager: id
            },

            raw: true,
            //Other parameters

        })
    } catch (err) {
        console.log(err);
    }
}

const findAccountHaveMaxDebt = async() => {
    try {
        return await models.Account.findAll({
            where: {
                total_money: 1010,
            },
            raw: true,

            //Other parameters

        })
    } catch (err) {
        console.log(err);
    }
}


/*
const findByUserName = async(user_name) => {
    try {
        const user = await models.UserAccount.findAll({
            where: {
                user_name: user_name
            }
        })
        return user[0]
    } catch (err) {
        console.log(err);
    }
}

const updateAccount = async(account) => {
    try {
        await models.UserAccount.update({
            user_name: account.user_name,
            password: account.password,
            name: account.name,
            identity_card: account.identity_card,
            active: account.active,
            is_alert: account.is_alert,
        }, {
            where: {
                id: account.id
            }
        })
    } catch (err) {
        console.log(err);
    }
}*/
module.exports = { findByCovidServerId, updateMoney, addAccount, findAccountHaveMaxDebt };