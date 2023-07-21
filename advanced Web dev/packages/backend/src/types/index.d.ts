//Ebay
interface EbayProduct {
  ebay_id: string;
  price: number;
  images: string[];
  description: EbayProductDescription[];
}

interface EbayProductOffer {
  name: string;
  link: string;
  price: number;
  image: string;
}

interface EbayProductDescription {
  type: string;
  name: string;
  value: string;
}

interface ProductExpanded {
  id: string;
  name: string;
  image?: string;
  manufacturer: string;
  category: Category;
  price: number;
  rating?: number;
  likes?: number;
}

interface ProductRawAndEntity {
  entities: product[];
  raw: product[];
}
