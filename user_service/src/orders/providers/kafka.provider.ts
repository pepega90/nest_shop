import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaProvider {
    constructor(
        @Inject("SHOPPING_SERVICE") private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf("create.order");
        this.kafkaClient.subscribeToResponseOf("get.user.order")
        this.kafkaClient.subscribeToResponseOf("pay.user.order")
        await this.kafkaClient.connect();
      }

      
    async publish(event: string, message: any) {
        await this.kafkaClient.emit(event, message);
    }


    async publishResponse(event: string, message: any) {
        return await firstValueFrom(this.kafkaClient.send(event, message))
    }
}
