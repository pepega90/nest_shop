import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: "text", nullable: true})
    desc: string;

    @Column("decimal")
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Ini nanti dulu
    // @ManyToMany(() => Category, (category) => category.products)
    // @JoinTable()
    // categories: Category[];

}
