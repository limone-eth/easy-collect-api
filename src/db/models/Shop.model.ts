import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable
} from "typeorm";
import {Category} from "./Category.model";

@Entity('shops')
export class Shop extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naturalKey: string;

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

    @ManyToMany(type => Category)
    @JoinTable({name: 'Shop_Has_Categories'})
    categories: Category[];
}
