import { IsNotEmpty } from "class-validator";

export class AddToCartDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    qty: number;
}