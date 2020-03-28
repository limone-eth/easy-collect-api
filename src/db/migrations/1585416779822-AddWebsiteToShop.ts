import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddWebsiteToShop1585416779822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.addColumn('shops', new TableColumn({
            type: "varchar",
            name: "website",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.dropColumn('shops', "website");
    }

}
