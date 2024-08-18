import { IsNotEmpty } from "class-validator";

export class RemoveFromCartDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    cartItemId: number;
}