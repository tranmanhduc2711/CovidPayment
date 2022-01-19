module.exports = function(sequelize, Sequelize) {
    return sequelize.define('Account', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_covid_manager: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        total_money: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

    }, {
        sequelize,
        tableName: 'Account',
        timestamps: false,
    });
};