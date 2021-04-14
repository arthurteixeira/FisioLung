require('dotenv').config();

module.exports = {
    dialect: process.env.POSTGRES_DIALECT,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    timezone: '-03:00',
    logging:false,
    define: {
        timestamps: true,
        underscored: true,
    },
};