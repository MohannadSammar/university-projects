import { User } from "../../src/entity/User";
import { hashPassword } from "../../src/controller/auth";
import { getRepository } from "typeorm";
import request from "supertest";
import { Helper } from "test/helper";

export const testUserData = {
  name: "Jest",
  email: "jest@test.de",
  password: "jestpassword",
  passwordConfirm: "jestpassword",
};

export const createUser = async () => {
  const user = new User();
  (user.name = testUserData.name),
    (user.email = testUserData.email),
    (user.passwordChangedAt = new Date());
  user.password = await hashPassword(testUserData.password);
  await getRepository(User).save(user);
};

export const login = async (
  helper: Helper,
  email: string = testUserData.email,
  password: string = testUserData.password
): Promise<string> => {
  const res = await request(helper.app)
    .post("/api/login")
    .send({
      email,
      password,
    })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .expect(201);

  return res.body.token;
};

export const createAndLogin = async (helper) => {
  await createUser();
  return await login(helper, testUserData.email, testUserData.password);
};
