import "jest";
import { testUserData, createAndLogin, createUser } from "../helper/auth";
import request from "supertest";
import { Product } from "../../src/entity/Product";
import { Helper } from "../helper";
import { ProductHelper } from "../helper/product";
import { ReviewHelper } from "../helper/review";

describe("user", () => {
  const helper = new Helper();
  const reviewHelper = new ReviewHelper();
  let token: string;

  beforeAll(async () => {
    await helper.init();
    await reviewHelper.initData();
    token = await createAndLogin(helper);
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to get liked products", async () => {
    const res = await request(helper.app)
      .get(`/api/me/likes`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });

  it("should be able to get reviewed products", async () => {
    const res = await request(helper.app)
      .get(`/api/me/reviews`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });
});
