export interface SmallCardProduct{
    category: string,
    id: string,
    image: string,
    manufacturer: string,
    name: string,
    price: number,
    rating: number,
    variants?: Variant[]
}
