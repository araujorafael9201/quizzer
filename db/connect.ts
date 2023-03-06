import mysql from 'serverless-mysql'

const conn = mysql();

conn.config({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
})

export default conn;

