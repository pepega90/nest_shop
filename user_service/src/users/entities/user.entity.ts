import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Cart)
    @JoinColumn()
    carts: Cart;

    @OneToOne(() => Wishlist)
    @JoinColumn()
    wishlist: Wishlist;

    @CreateDateColumn()
    createdAt: Date;
}
