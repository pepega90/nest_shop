import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaProvider {
    constructor(
        @Inject("PRODUCT_SERVICE") private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf("create.product");
        this.kafkaClient.subscribeToResponseOf("get.products");
        this.kafkaClient.subscribeToResponseOf("add.cart");
        this.kafkaClient.subscribeToResponseOf("add.wishlist");
        await this.kafkaClient.connect();
      }

      
    async publish(event: string, message: any) {
        await this.kafkaClient.emit(event, message);
    }


    async publishResponse(event: string, message: any) {
        return await firstValueFrom(this.kafkaClient.send(event, message))
    }
}
