import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column("decimal")
    totalAmount: number

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[]

    @Column({default: "PENDING"}) // PENDING, PAID
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}