import "jest";
import { Product } from "../../src/entity/Product";
import { Variant } from "../../src/entity/Variant";
import request from "supertest";
import { Helper } from "../helper";
import { testUserData, createAndLogin, createUser } from "../helper/auth";
import { ReviewHelper } from "../helper/review";

describe("review", () => {
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

  it("should be able to create a review", async () => {
    const review = reviewHelper.testReviewProduct;

    const res = await request(helper.app)
      .post("/api/reviews")
      .send({
        user: testUserData,
        productId: review.productId,
        title: review.title,
        text: review.text,
        rating: review.rating,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.review.title).toBe(review.title);
    expect(res.body.review.text).toBe(review.text);
    expect(res.body.review.rating).toBe(review.rating);
  });

  it("should be able to update a review", async () => {
    const review = reviewHelper.testReviewProduct;

    const updatedReview = review;
    updatedReview.text = "Updated review text";
    updatedReview.rating = 5;

    const res = await request(helper.app)
      .patch("/api/reviews")
      .send({
        user: testUserData,
        productId: updatedReview.productId,
        title: updatedReview.title,
        text: updatedReview.text,
        rating: updatedReview.rating,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
    expect(res.body.review.title).toBe(updatedReview.title);
    expect(res.body.review.text).toBe(updatedReview.text);
    expect(res.body.review.rating).toBe(updatedReview.rating);
  });

  it("should not be able to create 2 reviews for 1 product", async () => {
    const review = reviewHelper.testReviewProduct;

    const res = await request(helper.app)
      .post("/api/reviews")
      .send({
        user: testUserData,
        productId: review.productId,
        title: review.title,
        text: review.text,
        rating: review.rating,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(res.body.status).toBe("error");
  });

  it("should not be able to update a review with no title", async () => {
    const review = reviewHelper.testReviewProduct;

    const updatedReview = review;
    updatedReview.text = "Updated review text";
    updatedReview.rating = 5;

    const res = await request(helper.app)
      .patch("/api/reviews")
      .send({
        user: testUserData,
        productId: updatedReview.productId,
        text: updatedReview.text,
        rating: updatedReview.rating,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(500);

    expect(res.body.msg).toBe("Title may not be NULL");
  });

  it("should not be able to update a review with no text", async () => {
    const review = reviewHelper.testReviewProduct;

    const updatedReview = review;
    updatedReview.text = "Updated review text";
    updatedReview.rating = 5;

    const res = await request(helper.app)
      .patch("/api/reviews")
      .send({
        user: testUserData,
        title: updatedReview.title,
        productId: updatedReview.productId,
        rating: updatedReview.rating,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(500);

    expect(res.body.msg).toBe("Text may not be NULL");
  });

  it("should not be able to update a review with no rating", async () => {
    const review = reviewHelper.testReviewProduct;

    const updatedReview = review;
    updatedReview.text = "Updated review text";
    updatedReview.rating = 5;

    const res = await request(helper.app)
      .patch("/api/reviews")
      .send({
        user: testUserData,
        productId: updatedReview.productId,
        title: updatedReview.title,
        text: updatedReview.text,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(500);

    expect(res.body.msg).toBe("Rating may not be NULL");
  });

  it("should be able to delete a review", async () => {
    const review = reviewHelper.testReviewProduct;
    const review_id = await reviewHelper.getReviewId();

    const res = await request(helper.app)
      .delete(`/api/reviews/${review_id}`)
      .send({
        user: testUserData,
      })
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });
});
