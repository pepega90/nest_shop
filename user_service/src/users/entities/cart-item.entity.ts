import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart, (cart) => cart.items, {onDelete: "CASCADE"})
    cart: Cart;

    @Column()
    productId : number;

    @Column()
    productName: string;

    @Column("decimal")
    price: number;

    @Column({default: 1})
    quantity: number;

    @CreateDateColumn()
    addedAt: Date;
}