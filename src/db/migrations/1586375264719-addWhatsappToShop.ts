import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddWhatsappToShop1586375264719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.addColumn('shops', new TableColumn({
            type: "varchar",
            name: "whatsapp",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.dropColumn('shops', "whatsapp");
    }

}
