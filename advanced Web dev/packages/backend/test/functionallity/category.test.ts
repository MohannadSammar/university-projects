import "jest";
import { createAndLogin } from "../helper/auth";
import request from "supertest";
import { Helper } from "../helper";
import { ProductHelper } from "../helper/product";

describe("categories", () => {
  const helper = new Helper();
  const categoryHelper = new ProductHelper();
  let token: string;

  beforeAll(async () => {
    await helper.init();
    await categoryHelper.init();
    token = await createAndLogin(helper);
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to get all categories", async () => {
    const category = categoryHelper.getCategory();

    const res = await request(helper.app)
      .get("/api/categories")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.categories.length).toBe(1);
  });

  it("should be able to create a category", async () => {
    const res = await request(helper.app)
      .get("/api/categories")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.categories[0].name).toBe("TestCategory");
  });

  it("should be able to get products by categoryid", async () => {
    const category = categoryHelper.getCategory();

    const res = await request(helper.app)
      .get(`/api/categories/${category.id}/products`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.count).toBe(1);
  });

  it("should be able to add product to category", async () => {
    const category = categoryHelper.getCategory();

    const res = await request(helper.app)
      .get(`/api/categories/${category.id}/products`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.products[0].name).toBe("Testproduct");
  });

  it("should be able to count categories", async () => {
    const res = await request(helper.app)
      .get(`/api/categories`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.count).toBe(res.body.categories.length);
  });
});
