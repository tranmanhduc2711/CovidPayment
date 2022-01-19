module.exports = {
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432', //localhost db port
    database: 'Payment',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
};