import "reflect-metadata";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import "jest";
import request from "supertest";
import { Helper } from "../helper";
import { verifyToken } from "../../src/controller/auth";
import { testUserData, createAndLogin, createUser } from "../helper/auth";

const timestamp = (date_str) => new Date(date_str).getTime();

const checkJwt = async (token, user) => {
  const decoded = await verifyToken(token);
  expect(decoded.id).toBe(user.id);
};

describe("auth", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to sign up", async () => {
    await helper.resetDatabase();

    const res = await request(helper.app)
      .post("/api/signup")
      .send(testUserData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(201);

    expect(res.body.status).toBe("success");
    expect(res.body.user.email).toBe(testUserData.email);
    expect(res.body.user.name).toBe(testUserData.name);
    expect(timestamp(res.body.user.passwordChangedAt)).toBeLessThanOrEqual(
      timestamp(new Date())
    );

    checkJwt(res.body.token, res.body.user);
    expect(res.header["set-cookie"][0].includes("jwt=")).toBe(true);
  });

  it("should not be able to sign up with an existing email", async () => {
    await helper.resetDatabase();
    await createUser();

    const res = await request(helper.app)
      .post("/api/signup")
      .send(testUserData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(res.body.status).toBe("bad_request");
  });

  it("should not be able to sign up with not matching passwords", async () => {
    await helper.resetDatabase();

    const data = {
      ...testUserData,
      passwordConfirm: "iAmWrong",
    };

    const res = await request(helper.app)
      .post("/api/signup")
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(res.body.status).toBe("bad_request");
  });

  it("should not be able to login with wrong email", async () => {
    await helper.resetDatabase();
    await createUser();

    const loginData = {
      email: "iam@wrong.de",
      password: testUserData.password,
    };

    const res = await request(helper.app)
      .post("/api/login")
      .send(loginData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(res.body.status).toBe("unauthorized");
  });

  it("should not be able to login with wrong password", async () => {
    await helper.resetDatabase();
    await createUser();

    const loginData = {
      email: testUserData.email,
      password: "iAmWrong",
    };

    const res = await request(helper.app)
      .post("/api/login")
      .send(loginData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(res.body.status).toBe("unauthorized");
  });

  it("should be able to login", async () => {
    await helper.resetDatabase();

    await createUser();

    const loginData = {
      email: testUserData.email,
      password: testUserData.password,
    };

    const res = await request(helper.app)
      .post("/api/login")
      .send(loginData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(201);

    expect(res.body.status).toBe("success");
    expect(res.body.user.email).toBe(testUserData.email);
    expect(res.body.user.name).toBe(testUserData.name);

    checkJwt(res.body.token, res.body.user);
    expect(res.header["set-cookie"][0].includes("jwt=")).toBe(true);
  });

  it("should be able to access protected routes when authorized", async () => {
    await helper.resetDatabase();
    const token = await createAndLogin(helper);

    const res = await request(helper.app)
      .get("/api/me")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");
  });

  it("should be not able to access protected routes when unauthorized", async () => {
    await helper.resetDatabase();

    const res = await request(helper.app)
      .get("/api/me")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(res.body.status).toBe("unauthorized");
  });

  it("should be able to change the password", async () => {
    await helper.resetDatabase();
    const token = await createAndLogin(helper);

    const data = {
      password: testUserData.password,
      newPassword: "aNewPassword",
      newPasswordConfirm: "aNewPassword",
    };

    const res = await request(helper.app)
      .patch("/api/updatePassword")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");

    checkJwt(res.body.token, res.body.user);
    expect(res.header["set-cookie"][0].includes("jwt=")).toBe(true);
    expect(timestamp(res.body.user.passwordChangedAt)).toBeLessThanOrEqual(
      timestamp(new Date())
    );
  });

  it("should be able to logout", async () => {
    await helper.resetDatabase();
    const token = await createAndLogin(helper);

    const res = await request(helper.app)
      .post("/api/logout")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body.status).toBe("success");

    expect(res.header["set-cookie"][0].includes("jwt=logedout")).toBe(true);
  });
});
