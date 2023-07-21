import { SmallCard } from "../../SmallCard/SmallCard";
import { GridContainer } from "./style";
import { SmallCardProduct } from "../../../types/SmallCardProduct";

interface SmallCardInterface {
  products: SmallCardProduct[];
  tex?: boolean;
  liked?: boolean;
  upload?: boolean;
}

export const SmallCardsContainer: React.FC<SmallCardInterface> = ({
  products,
  tex,
  liked,
  upload,
}) => {
  const previews =
    products &&
    products.map((product: SmallCardProduct, key: number) => {
      return (
        <SmallCard
          product={product}
          key={key}
          tex={tex}
          liked={liked}
          upload={upload}
        />
      );
    });

  return <GridContainer>{previews}</GridContainer>;
};
