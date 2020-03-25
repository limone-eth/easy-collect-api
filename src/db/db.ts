import {createConnection} from "typeorm";
export let connect = async () => {
    const connection = await createConnection({
        "type": "mysql",
        "host":"eu-cdbr-west-02.cleardb.net",
        "username":"be2ebac224559b",
        "password":"8c353cc1",
        "database":"heroku_60b35230388ffab",
        "synchronize": false,
        "logging": true,
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


