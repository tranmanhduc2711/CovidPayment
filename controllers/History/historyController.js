const service = require("../../models/Services/History");


const add = (id_covid_manager, money) => {
    const date = new Date().toLocaleString();
    const his = {
        id_covid_manager: id_covid_manager,
        money: money,
        time: date,
    };
    service.addHistory(his)
};


module.exports = { add };