import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable
} from "typeorm";
import {Category} from "./Category.model";
import {Options} from "node-geocoder";
import node_geocoder = require("node-geocoder");
import {CustomError} from "../../routing-utilities/CustomError";
import {XError} from "../../routing-utilities/XError";
import * as request from "superagent"

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
    whatsapp: string;

    @Column()
    website: string;

    @Column()
    telegram: string;

    @Column()
    facebook: string;

    @Column()
    description: string;

    @Column()
    is_deleted: boolean;

    @Column()
    accepts_terms_and_conditions: boolean;

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

    /**
     * ERRORS
     */
    static readonly COORDINATES_NOT_FOUND_ERROR = new CustomError(2, 'coordinates_not_found_error');
    static readonly AMBIGUOUS_ADDRESS_ERROR = new CustomError(3, 'ambiguous_address_error');

    /**
     * METHODS
     */
    async setCoordinatesFromAddress(): Promise<Shop> {

        // tslint:disable-next-line:no-shadowed-variable
        const response:any = await request.get("https://nominatim.openstreetmap.org/search")
            .query({street: this.address})
            .query({city: this.city})
            .query({cap: this.cap})
            .query({email: 'simonestaffa96@gmail.com'})
            .query({format: 'json'});

        if (response.body.length > 0){
            response.body = response.body.filter((r: any) => {
                return r.display_name.toLowerCase().includes(this.city.toLowerCase());
            });
        }
        try {
            this.lat = response.body[0].lat;
            this.lng = response.body[0].lon;
            if (!response.body[0].display_name.toLowerCase().includes(this.city.toLowerCase())) {
                throw new XError(Shop.AMBIGUOUS_ADDRESS_ERROR, 419, 'The address specified is ambiguous. Please be sure using the correct city and zipcode.')
            }
        } catch (error) {
            if (error instanceof XError) {
                throw error;
            } else {
                throw new XError(Shop.COORDINATES_NOT_FOUND_ERROR, 419, 'Invalid address: coordinates not found')
            }
        }

        return this;
    }
}
