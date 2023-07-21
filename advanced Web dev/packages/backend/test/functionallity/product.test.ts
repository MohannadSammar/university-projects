import "jest";
import { testUserData, createAndLogin, createUser } from "../helper/auth";
import request from "supertest";
import { Product } from "../../src/entity/Product";
import { Helper } from "../helper";
import { ProductHelper } from "../helper/product";

describe("product", () => {
  const helper = new Helper();
  const productHelper = new ProductHelper();
  let token: string;

  beforeAll(async () => {
    await helper.init();
    await productHelper.init();
    token = await createAndLogin(helper);
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to get a product by id", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.product.id).toBe(product.id);
    expect(res.body.product.name).toBe(product.name);
    expect(res.body.product.price).toBe(product.price);
    expect(res.body.product.manufacturer).toBe(product.manufacturer);
  });

  it("should be able to get product offers by id", async () => {
    const product = await productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/offers`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });

  it("should not be able to receive product offers with wrong id", async () => {
    const wrong_product = {
      id: "12345678",
    };

    const res = await request(helper.app)
      .get(`/api/products/${wrong_product.id}/offers`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(500);

    expect(res.body.status).toBe("Error");
  });

  it("should be able to search a product by keyword", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/search/${product.manufacturer}`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(true).toBe(res.body.count > 0);
  });

  it("should be able to receive reviews by product id", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/reviews`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.reviews).toStrictEqual([]);
  });

  it("should be able to like a product", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/like`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });

  it("should not be able to like a product a second time", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/like`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("Already liked by user!");
  });

  it("should be able to dislike a product", async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/dislike`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });

  it(`should not be able to dislike a product 
          when product is not liked by user`, async () => {
    const product = productHelper.getProduct();

    const res = await request(helper.app)
      .get(`/api/products/${product.id}/dislike`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("Is not liked by user!");
  });
});
