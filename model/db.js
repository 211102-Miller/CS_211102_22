import pgk from 'pg';
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

export default  getConnection;