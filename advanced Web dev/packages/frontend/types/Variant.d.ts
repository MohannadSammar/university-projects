import { Attribute } from "./Attribute";

export interface Variant{
    attributes: Attribute[];
    id: string,
    image: string,
    name: string,
    price: number
}