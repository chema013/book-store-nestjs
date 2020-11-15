import {MigrationInterface, QueryRunner} from "typeorm";

export class fixName1605327112931 implements MigrationInterface {
    name = 'fixName1605327112931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users_details"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "update_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users_details"."update_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users_details"."update_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "update_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users_details"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD "username" character varying(50) NOT NULL`);
    }

}
