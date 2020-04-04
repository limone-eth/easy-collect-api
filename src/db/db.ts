import {createConnection} from "typeorm";
const isPortReachable = require('is-port-reachable');
export let connect = async () => {
    let dbStatus = false;

    while (!dbStatus) {
        dbStatus = await isPortReachable(3306, {host: process.env.DB_HOSTNAME});
    }
    const connection = await createConnection({
        "type": "mysql",
        "host":process.env.DB_HOSTNAME,
        "username":process.env.DB_USERNAME,
        "password":process.env.DB_PASSWORD,
        "database":process.env.DB_NAME,
        "synchronize": false,
        "logging": true,
        "migrationsRun": true,
        "migrationsTableName": "custom_migration_table",
        "entities": [
            __dirname + '/models/*.js'
        ],
        "migrations": [
            __dirname + '/migrations/*.js'
        ],
        "cli": {
            entitiesDir: __dirname + "/models/",
            migrationsDir: __dirname + '/migrations/'
        }
    });
};


