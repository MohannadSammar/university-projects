import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "./../entity/User";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "90d",
  });
};

export const verifyToken = (token: string) =>
  new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || "", (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data == undefined || typeof data == "string") {
        return reject(data);
      }
      resolve(data);
    });
  });

export const hashPassword = async (password) => await bcrypt.hash(password, 12);
export const comparePasswords = async (password, hash) =>
  await bcrypt.compare(password, hash);

const createAndSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { email, name, password, passwordConfirm } = req.body;

  const userRepository = await getRepository(User);

  // Check if user exists
  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).send({
      status: "bad_request",
      message: "User already exists.",
    });
  }
  if (password != passwordConfirm) {
    return res.status(400).send({
      status: "bad_request",
      message: "Passwords do not match",
    });
  }

  // Generate hashed password
  const hashedPassword: string = await hashPassword(password);

  const newUser = new User();
  newUser.email = email;
  newUser.name = name;
  newUser.image = "default";
  newUser.password = hashedPassword;
  newUser.passwordChangedAt = new Date(new Date().valueOf() - 60000);

  const createdUser = await userRepository.save(newUser);
  delete createdUser.password;

  createAndSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = await getRepository(User);
  // Check if user exists
  const user = await userRepository.findOne({
    select: ["password", "email", "name", "id"],
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).send({ status: "unauthorized" });
  }

  const matchingPasswords: boolean = await comparePasswords(
    password,
    user.password
  );
  if (!matchingPasswords) {
    return res.status(401).send({ status: "unauthorized" });
  }

  createAndSendToken(user, 201, req, res);
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.cookie("jwt", "logedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Get Token
    let token;
    if (
      req.headers?.authorization &&
      req.headers?.authorization?.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req?.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return res.status(401).send({ status: "unauthorized" });

    //Validate Token
    const decoded = await verifyToken(token);

    //Check if user still exists
    const userRepository = await getRepository(User);
    const user = await userRepository.findOne(decoded.id);
    if (!user) {
      return res
        .status(401)
        .send({ status: "unauthorized", message: "User does not exist" });
    }

    //Check if user has changes the password
    const changedTimestamp = user.passwordChangedAt.getTime() / 1000;
    if (!decoded.iat || decoded.iat < changedTimestamp) {
      return res
        .status(401)
        .send({ status: "unauthorized", message: "Password changed" });
    }

    //ACCSES Granted!
    req.user = user;
    res.locals.user = user;
    next();
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response) => {
    const { password, newPassword, newPasswordConfirm } = req.body;

    if (!req.user) {
      return res.status(401).send({ status: "unauthorized" });
    }

    const userRepository = await getRepository(User);
    const user = await userRepository.findOne(req.user.id);
    if (!user) {
      return res
        .status(401)
        .send({ status: "unauthorized", message: "User does not exist" });
    }

    //Check if pass is correct
    const matchingPasswords: boolean = await comparePasswords(
      password,
      user.password
    );
    if (!matchingPasswords)
      return res
        .status(401)
        .send({ status: "bad_request", message: "Password incorrect" });

    if (newPassword != newPasswordConfirm) {
      return res.status(400).send({
        status: "bad_request",
        message: "Passwords do not match",
      });
    }

    //Log user in
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await userRepository.save(user);

    //Login
    createAndSendToken(user, 200, req, res);
  }
);
