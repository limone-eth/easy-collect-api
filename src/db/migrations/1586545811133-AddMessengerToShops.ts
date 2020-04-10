import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddMessengerToShops1586545811133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.addColumn('shops', new TableColumn({
            type: "varchar",
            name: "messenger",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.dropColumn('shops', "messenger");
    }

}
