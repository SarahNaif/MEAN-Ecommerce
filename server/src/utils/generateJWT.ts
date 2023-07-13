import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/user-type";

const SECRET: Secret = process.env.TOKEN_SECRET as Secret;

export const generateJWT = (user:User)=>{
    return jwt.sign(user, SECRET, {
        expiresIn: "30d"
    });
}