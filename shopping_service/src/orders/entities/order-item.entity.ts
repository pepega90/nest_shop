import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.items, {onDelete: "CASCADE"})
    order: Order;

    @Column()
    productName: string;

    @Column()
    qty: number;

    @Column("decimal")
    price: number;
}