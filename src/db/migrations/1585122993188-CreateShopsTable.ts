import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateShopsTable1585122993188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "shops",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "natural_key",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "address",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "lat",
                    type: "float",
                    isNullable: false
                },
                {
                    name: "lng",
                    type: "float",
                    isNullable: false
                },
                {
                    name: "phone",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "telegram",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "facebook",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "is_deleted",
                    type: "boolean",
                    isNullable: false,
                    default: false
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable("shops");
    }

}
