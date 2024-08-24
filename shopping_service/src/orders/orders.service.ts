import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository : Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepo : Repository<OrderItem>,
    ) {}

    public async createOrder(payload) {
        let userCartItems = payload.carts.items;
        
        // initialize orderUser
        let orderUser = this.orderRepository.create({
            status: "PENDING",
            userId: payload.id,
            totalAmount: 0,  // init awal-awal 0
            items: []  // init awal-awal array kosong
        });

        // lalu create orderUser
        orderUser = await this.orderRepository.save(orderUser);

        // loop ke semua item dari carts user yang berasal dari payload
        for (let item of userCartItems) {
            // create order item
            let orderItem = this.orderItemRepo.create({
                order: orderUser,  
                price: parseFloat(item.price),
                productName: item.productName,
                qty: item.quantity
            });

            // kalkulasi total amount order user
            orderUser.totalAmount += orderItem.price * orderItem.qty;

            // save order item 
            await this.orderItemRepo.save(orderItem);

            // lalu push ke array items di orderUser
            orderUser.items.push(orderItem);
        }

        // update total amountnya
        await this.orderRepository.update(orderUser.id, {
            totalAmount: orderUser.totalAmount
        });

        // lalu return 
        return await this.orderRepository.findOne({
            where: { id: orderUser.id },
            relations: ['items'],
        });
    }

    public async findOne(id: number) {
        return await this.orderRepository.find({where: {userId: id}, relations: {
            items: true,
        }})
    }

    public async paymentOrder(userId: number, orderId) {
        let orderUser = undefined;
        try {
            orderUser = await this.orderRepository.findOne({where: {id: orderId, userId: userId}})
            orderUser.status = "PAID";
            return await this.orderRepository.save(orderUser)
        } catch (error) {
            throw error;
        }
    }
}
