import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class WishlistItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Wishlist, (wishlist) => wishlist.items, {onDelete: "CASCADE"})
    wishlist: Wishlist;

    @Column()
    productId: number;

    @Column()
    productName: string;

    @Column("decimal")
    price: number;

    @CreateDateColumn()
    addedAt: Date;
}