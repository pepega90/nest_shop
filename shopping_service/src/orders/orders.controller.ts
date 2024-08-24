import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern("create.order")
  public async createOrder(data: any) {
    const orderCreated = await this.ordersService.createOrder(data);
    return {
      status: 200,
      message: "Success created Order",
      data: orderCreated
    }
  }

  @MessagePattern("get.user.order")
  public async getUserOrder(data: any) {
    const orderUser = await this.ordersService.findOne(data);
    return {
      data: orderUser
    }
  }
}
