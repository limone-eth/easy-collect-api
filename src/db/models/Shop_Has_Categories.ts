import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import {Category} from "./Category.model";
import {Shop} from "./Shop.model";

@Entity('shop_has_categories')
export class ShopHasCategories extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    natural_key: string;

    @Column()
    categories_id: number;

    @Column()
    shops_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
