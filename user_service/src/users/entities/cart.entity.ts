import { CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";
import { User } from "./user.entity";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.carts, {onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];

    @CreateDateColumn()
    createdAt: Date;
}