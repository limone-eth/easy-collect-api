import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterShopTable1585228402768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('shops', new TableColumn({
            type: "varchar",
            name: "city",
            isNullable: true
        }));
        return queryRunner.addColumn('shops', new TableColumn({
            type: "varchar",
            name: "cap",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('shops', new TableColumn({
            type: "integer",
            name: "categories_id",
            isNullable: false
        }));
        await queryRunner.dropColumn('shops', "city");
        return queryRunner.dropColumn('shops', "cap");
    }

}
