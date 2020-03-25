import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoriesTable1585122998931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "categories",
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
        return await queryRunner.dropTable("categories");
    }

}
