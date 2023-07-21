import { Product } from "../../src/entity/Product";
import { Variant } from "../../src/entity/Variant";
import { getRepository } from "typeorm";
import { Review } from "../../src/entity/Review";

export class ReviewHelper {
  public testReviewProduct = {
    title: "Test Review Title",
    text: "Review for a Product",
    rating: 4,
    productId: "",
  };

  public testReviewVariant = {
    title: "Test Review Title",
    text: "Review for a Variant",
    rating: 4,
    productId: "",
    variantId: "",
  };

  private createProduct = async () => {
    const product = new Product();
    product.name = "Testproduct";
    product.price = 199.99;
    product.manufacturer = "Testmanufacturer";
    await getRepository(Product).save(product);
    const product_record = await getRepository(Product).findOneOrFail({
      where: {
        name: "Testproduct",
      },
    });

    return product_record;
  };

  private createVariant = async (product: any) => {
    const variant = new Variant();
    variant.name = "Testvariant";
    variant.price = 299.99;
    variant.product = product;
    await getRepository(Variant).save(variant);
    const variant_record = await getRepository(Variant).findOneOrFail({
      where: {
        name: "Testvariant",
      },
    });

    return variant_record;
  };

  public initData = async () => {
    const product = await this.createProduct();
    const variant = await this.createVariant(product);

    this.testReviewProduct.productId = product.id;
    this.testReviewVariant.variantId = variant.id;
    this.testReviewVariant.productId = product.id;
  };

  public getReviewId = async () => {
    const reviewRepository = getRepository(Review);
    const review = await reviewRepository.findOneOrFail();
    return review.id;
  };
}
