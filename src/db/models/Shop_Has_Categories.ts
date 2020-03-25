import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

import {Category} from "./Category.model";
import {Shop} from "./Shop.model";

@Entity('Shop_Has_Categories')
export class ShopHasCategories extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naturalKey: string;

    @Column()
    categoriesId: string;

    @Column()
    shopsId: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
