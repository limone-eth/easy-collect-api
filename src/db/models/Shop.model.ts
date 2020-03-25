import {
    BaseEntity,
    Column,
    Entity, ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {ShopCategory} from "./ShopCategory.model";

@Entity('shop')
export class Shop extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    lat_long: string;
    @Column()
    contact: string;
    @ManyToMany(type => ShopCategory, shopCategory => shopCategory.name)
    shop_category: ShopCategory[]
}
