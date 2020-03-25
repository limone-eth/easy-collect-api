import {
    BaseEntity,
    Column,
    Entity, OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "./Category.model";

@Entity('shops')
export class Shop extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    phone: string;

    @Column()
    telegram: string;

    @Column()
    facebook: number;

    @Column()
    categories_id: number;

    @Column()
    is_deleted: boolean;

    @CreateDateColumn() 
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    contact: string;

    @OneToOne(type => Category)
    category: Category[]
}
