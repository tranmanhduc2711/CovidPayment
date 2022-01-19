module.exports = function(sequelize, Sequelize) {
    return sequelize.define('History', {
        id_covid_manager: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        time: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: true

        },

    }, {
        sequelize,
        tableName: 'History',
        timestamps: false,
    });
};