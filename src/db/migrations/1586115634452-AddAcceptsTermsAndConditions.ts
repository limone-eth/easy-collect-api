import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAcceptsTermsAndConditions1586115634452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.addColumn('shops', new TableColumn({
            type: "boolean",
            name: "accepts_terms_and_conditions",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.dropColumn('shops', "accepts_terms_and_conditions");
    }

}
