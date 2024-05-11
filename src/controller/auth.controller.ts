import { Request, Response } from "express";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, role, mobile_number, email, password } =
      req.body;
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exist");
    }
    const encPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      first_name,
      last_name,
      role,
      mobile_number,
      email,
      password: encPassword,
    });
    await newUser.save();
    return res.status(200).send({
      data: null,
      success: true,
      message: "Register Successfull!",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        error instanceof Error ? error?.message : "Something went wrong!",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      email: username,
    });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassMatch = await bcrypt.compare(password, user?.password);
    if (!isPassMatch) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign({ user }, "mysecretkey");
    return res.status(200).send({
      success: true,
      message: "Login Successfull!",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        error instanceof Error ? error?.message : "Something went wrong!",
      data: null,
    });
  }
};

export const loginByToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decode: any = jwt.verify(token, "mysecretkey");
    const user = await UserModel.findById(decode?.user?._id);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized!",
        data: null,
      });
    }
    // setTimeout(()=>{
    return res.status(200).send({
      success: true,
      message: "Login Successfull!",
      data: user,
    });
    // }, 3000)
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        error instanceof Error ? error?.message : "Something went wrong!",
      data: null,
    });
  }
};
