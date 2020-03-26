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
    natural_key: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    cap: string;

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
    description: string;

    @Column()
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(type => Category, {eager: true})
    @JoinTable({
        name: 'shop_has_categories',
        joinColumn: {
            name: "shops_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "categories_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];
}
