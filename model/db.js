import pgk from 'pg';
import  Sequelize  from 'sequelize';
const { Pool } = pgk;
import { db } from '../config.js';

async function getConnection(){
    const client = new Pool({
        user: db.user,
        host: db.host,
        database: db.database,
        password: db.password,
        port: db.port
    });

    await client.connect();
    return client;
}

const SequelizeClient = new Sequelize(db.database, db.user, db.password, {
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized:false
        }
    },
    host: db.host,
    dialect: 'postgres',
});

SequelizeClient.authenticate()
    .then(() => {
        console.log('Conected');
    })
    .catch((Error) => {
        console.log('Connection Fail', Error);
    })

export const getData = { getConnection, SequelizeClient };