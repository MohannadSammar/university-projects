import { Review } from "../../src/entity/Review";
import { getRepository } from "typeorm";
import { Product } from "../../src/entity/Product";
import { instantiateApi } from "../../src/util/api_conn";
import { Category } from "../../src/entity/Category";

export class ProductHelper {
  private product: any;
  private review: any;
  private ebay: any;
  private category: any;

  private createProduct = async () => {
    const product = new Product();

    product.name = "Testproduct";
    product.price = 199.99;
    product.manufacturer = "Testmanufacturer";

    await getRepository(Product).save(product);

    const product_record = await getRepository(Product).save(product);

    return product_record;
  };

  private createCategory = async () => {
    const category = new Category();

    category.name = "TestCategory";
    const product = new Product();

    product.name = "Testproduct";
    product.price = 199.99;
    product.manufacturer = "Testmanufacturer";

    category.products = [];
    category.products.push(product);

    await getRepository(Product).save(product);
    await getRepository(Category).save(category);

    const categorydb = await getRepository(Category).save(category);

    return categorydb;
  };

  private createReview = async () => {
    const review = new Review();
    review.title = "Test Review Title";
    review.text = "Test Review Text";
    review.rating = "4";
    review.product = this.product;

    await getRepository(Review).save(review);

    const review_record = await getRepository(Review).save(review);

    return review_record;
  };

  public getProduct() {
    return this.product;
  }

  public getCategory() {
    return this.category;
  }

  public getAPI() {
    return this.ebay;
  }

  private initData = async () => {
    this.review = await this.createReview();
    this.product = await this.createProduct();
    this.category = await this.createCategory();
  };

  private initAPI = async () => {
    this.ebay = instantiateApi();
  };

  public init = async () => {
    await this.initData();
    await this.initAPI();
  };
}
