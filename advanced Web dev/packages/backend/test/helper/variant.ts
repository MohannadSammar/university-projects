import { getRepository } from "typeorm";
import { Variant } from "../../src/entity/Variant";
import { Product } from "../../src/entity/Product";
import { instantiateApi } from "../../src/util/api_conn";

export class VariantHelper {
  private variant: any;
  private product: any;
  private ebay: any;

  private createProduct = async () => {
    const product = new Product();

    product.name = "Testproduct";
    product.price = 199.99;
    product.manufacturer = "Testmanufacturer";

    await getRepository(Product).save(product);

    const product_record = await getRepository(Product).save(product);

    return product_record;
  };

  private createVariant = async () => {
    const variant = new Variant();
    variant.name = "Testvariant";
    variant.price = 299.99;
    variant.product = this.product;
    await getRepository(Variant).save(variant);
    const variant_record = await getRepository(Variant).findOneOrFail({
      where: {
        name: "Testvariant",
      },
    });

    return variant_record;
  };

  public getVariant = async () => {
    return this.variant;
  };

  private initData = async () => {
    this.product = await this.createProduct();
    this.variant = await this.createVariant();
  };

  private initAPI = async () => {
    this.ebay = instantiateApi();
  };

  public init = async () => {
    await this.initData();
    await this.initAPI();
  };
}
