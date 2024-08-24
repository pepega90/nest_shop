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
        
        // Ensure totalAmount and items are initialized
        let orderUser = this.orderRepository.create({
            status: "PENDING",
            userId: payload.id,
            totalAmount: 0,  // Initialize totalAmount to 0
            items: []  // Initialize empty items array
        });

        // Save the order first before adding items
        orderUser = await this.orderRepository.save(orderUser);

        // Loop through cart items and create order items
        for (let item of userCartItems) {
            let orderItem = this.orderItemRepo.create({
                order: orderUser,  // Assign the order reference
                price: parseFloat(item.price),  // Ensure price is parsed correctly
                productName: item.productName,
                qty: item.quantity
            });

            // Add the item price to the total amount
            orderUser.totalAmount += orderItem.price * orderItem.qty;

            // Save the order item
            await this.orderItemRepo.save(orderItem);

            // Add the saved order item to the order's items array
            orderUser.items.push(orderItem);
        }

        // Update the totalAmount in the order after all items have been processed
        await this.orderRepository.update(orderUser.id, {
            totalAmount: orderUser.totalAmount
        });

        // Return the final order
        return await this.orderRepository.findOne({
            where: { id: orderUser.id },
            relations: ['items'],  // Ensure items relation is returned
        });
    }

    public async findOne(id: number) {
        return await this.orderRepository.find({where: {userId: id}, relations: {
            items: true,
        }})
    }
}
