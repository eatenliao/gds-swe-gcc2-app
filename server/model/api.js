// here i connect to the postgres database and run the queries 
require('dotenv').config( {path: '../server/.env.development.local'} );

const { createPool } = require('@vercel/postgres');
const pool = createPool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const apiDB = {}

apiDB.getResponses = async (callback) => {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM responses;', (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    })
    client.release();
    }

apiDB.postResponse = async (name, temperature, question1, question2, callback) => {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO responses (name, temperature, question1, question2) VALUES ($1, $2, $3, $4)', [name, temperature, question1, question2], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
    client.release();
}

module.exports = apiDB;