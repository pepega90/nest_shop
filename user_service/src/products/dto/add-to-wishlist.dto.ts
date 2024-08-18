import { IsNotEmpty } from "class-validator";

export class AddToWishlistDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    productId: number;
}