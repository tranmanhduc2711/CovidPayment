const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
async function test() {
    const t = await models.Daily.findAll({ raw: true });
    console.log(t);
    return t;
}


const addHistory = async(history) => {
    try {
        await models.History.create({
            id_covid_manager: history.id_covid_manager,
            money: history.money,
            time: history.time,


        });
    } catch (err) {
        console.log(err);
    }
};
module.exports = { addHistory };