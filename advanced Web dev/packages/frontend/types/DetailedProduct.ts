import { Attribute } from "./Attribute";
import { Variant } from './Variant';

export interface DetailedProduct {
    attributes: Attribute[];
    category: string;
    id: string;
    likes: number;
    manufacturer: string;
    name: string;
    price: number;
    rating: number;
    ratingSum: number;
    variants?: Variant[];
}