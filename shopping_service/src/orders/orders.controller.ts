import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern("create.order")
  public async createOrder(data: any) {
    console.log("order service")
    console.log(data);
    console.log("order service")
    return {
      message: "order service (create-order) is called"
    }
  }
}
