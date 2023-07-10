import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/user-type";
import { UserStore } from "./../models/user";
import {generateJWT} from "../utils/generateJWT"


const userModel = new UserStore();

const SECRET: Secret = process.env.TOKEN_SECRET as Secret;


/**
 * @description Get User By ID  .
 * @param user.id 
 * @
 */


export const show = async (req: Request, res: Response) => {
  try {

    const user = await userModel.show(req.params.id);
    res.status(200).json({msg: `Successfully Show a User with ID : ${req.params.id}  `, user });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const showall = async (req: Request, res: Response) => {
  try {

    const user = await userModel.showAll();
    res.status(200).json({
      msg: "Successfully Show all Users",user });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description Create - Post User ( firstname,lastname,email,password ).
 * @param user
 * @
 */

export const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {

    if (!user.password || user.password.length < 5 || !user.email) {
      return res
        .status(400)
        .json({ error: "invalid password: must be at least 5 chars " });
    }

    const emailExist = await userModel.getByEmail(user.email)
      if (emailExist){return res.status(403).json({ message: 'User with current email already exists!' })}
        

    const newUser = await userModel.create(user);
    const token = generateJWT(newUser)

    res.status(200).json({
      msg: "Successfully Registered",
      _id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,
      token: token

    });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description Update - Put User ( firstname ,lastname ,email ,password ) +  user.id .
 * @param user.id 
 * @
 */

export const update = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {

    const newUser = await userModel.update(user, req.params.id);
    res.status(200).json({
      msg: `user ${newUser.firstname} password has been updated successfuly`,
      _id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,

    });
  } catch (error) {
    res.status(500).json(error);
  }
};


/**
 * @description Delete - DELETE User .
 * @param user.id 
 * @
 */

export const destroy = async (req: Request, res: Response) => {
  try {
    const newUser = await userModel.delete(req.params.id);
    return res.status(200).json({
      msg: `User with ID ${newUser.id} has been Deleated Successfully`,});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description POST - Login User .
 * @param user.password.user.email 
 * @
 */


export const authenticate = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = {
      email: _req.body.email,
      password: _req.body.password,
    };
    
    const newUser = await userModel.authenticate(email, password);
    if (newUser) {
      const token = generateJWT(newUser);
      res.status(202).json({
        msg: "Successfully LoggedIn !",
        _id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
        token: token
  
      });
    } else {
      res.status(403).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(401);
    res.json("invalid username or password");
    return;
  }
};
