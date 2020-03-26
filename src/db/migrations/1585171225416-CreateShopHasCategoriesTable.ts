import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateShopHasCategoriesTable1585171225416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "shop_has_categories",
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
                    name: "categories_id",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "shops_id",
                    type: "integer",
                    isNullable: false,
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
        return await queryRunner.dropTable("shop_has_categories");
    }

}
