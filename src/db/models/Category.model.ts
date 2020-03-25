import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity('categories')
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    natural_key: string;

    @Column()
    name: string;

}
