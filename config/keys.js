module.exports = {
    google: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    knexConfig: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            // port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    }
}