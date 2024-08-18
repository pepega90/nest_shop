import { IsNotEmpty } from "class-validator";

export class RemoveFromWishlistDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    wishlistItemId: number;
}