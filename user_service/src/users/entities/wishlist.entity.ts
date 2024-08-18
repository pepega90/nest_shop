import { CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WishlistItem } from "./wishlist-item.entity";
import { User } from "./user.entity";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.wishlist)
    user: User;

    @OneToMany(() => WishlistItem, (wishItem) => wishItem.wishlist)
    items: WishlistItem[];

    @CreateDateColumn()
    createdAt: Date;
}