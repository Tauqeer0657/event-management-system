import sql from 'mssql';

const dbConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
};

let pool;

async function connectToDatabase() {
    if (!pool) { 
        try {
            pool = await sql.connect(dbConfig);
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
            throw error; 
        }
    }
    return pool; 
}

function getPool() {
    if (!pool) {
        throw new Error('Database pool not initialized. Call connectToDatabase first.');
    }
    return pool;
}

function getSqlRequest() {
    if (!pool) {
        throw new Error('Database pool not initialized. Call connectToDatabase first.');
    }
    return pool.request(); // New SQL request instance from the pool
  };

export {  sql, connectToDatabase, getPool, getSqlRequest };