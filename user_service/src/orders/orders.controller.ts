import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(":id")
  public async getUserOrder(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.getUserOrder(id);
  }

  @Patch(":id/:orderId")
  public async payOrder(@Param("id", ParseIntPipe) id: number, @Param("orderId", ParseIntPipe) orderId: number) {
    return this.ordersService.payOrder(id, orderId)
  }

}
