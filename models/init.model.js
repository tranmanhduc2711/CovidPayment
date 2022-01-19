var DataTypes = require("sequelize").DataTypes;
var _Account = require("./Account");
var _History = require("./History");



function initModels(sequelize) {
    var Account = _Account(sequelize, DataTypes);
    var History = _History(sequelize, DataTypes);


    return {
        Account,
        History,

    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;