module.exports = {
    development: {
        client: 'mysql2',
        connection: require('./src/db-conn.json')
    }
}