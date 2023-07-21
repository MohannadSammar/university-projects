import { SmallCardProduct, Variant } from "./SmallCardProduct";
import { User } from "./User";
export interface Review {
  //TODO: Implement when we got the Data from the backend :)
  id: string;
  title: string;
  text: string;
  rating: string;
  product: SmallCardProduct;
  variant?: Variant;
  user?: User;
}
