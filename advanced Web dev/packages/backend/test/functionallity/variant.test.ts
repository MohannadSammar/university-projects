import "jest";
import { Product } from "../../src/entity/Product";
import { Variant } from "../../src/entity/Variant";
import { testUserData, createAndLogin, createUser } from "../helper/auth";
import request from "supertest";
import { Helper } from "../helper";
import { VariantHelper } from "../helper/variant";

describe("variant", () => {
  const helper = new Helper();
  const variantHelper = new VariantHelper();
  let token: string;

  beforeAll(async () => {
    await helper.init();
    await variantHelper.init();
    token = await createAndLogin(helper);
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to get variant offers by id", async () => {
    const variant = await variantHelper.getVariant();
    const offset = "0";

    const res = await request(helper.app)
      .get(`/api/variants/${variant.id}/offers?offset=${offset}`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("Success");
    expect(res.body.offers).toStrictEqual([]);
  });

  it("should not be able to receive product offers with wrong id", async () => {
    const wrong_variant = {
      id: "12345678",
    };
    const offset = "0";

    const res = await request(helper.app)
      .get(`/api/variants/${wrong_variant.id}/offers?offset=${offset}`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe(
      "Product with provided identifier was not found"
    );
  });

  it("should be able to fail when offset is an odd number", async () => {
    const variant = await variantHelper.getVariant();
    const offset = "1";

    const res = await request(helper.app)
      .get(`/api/variants/${variant.id}/offers?offset=${offset}`)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(500);

    expect(res.body.status).toBe("Error");
  });
});
