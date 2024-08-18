import { Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public async createOrder() {
    return this.ordersService.testOrderService();
  }
}
