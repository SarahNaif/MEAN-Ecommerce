import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



const secretToken = process.env.TOKEN_SECRET as string;

/**
 * Generate JWT RefreshToken.
 * @param user
 */

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, secretToken);
 
  req.userId = ( jwt.verify(token, secretToken) as JwtPayload).id;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized Access" });
  }
}else {
  let error = new Error("Not authorized, No token");
  res.status(401)
  next(error);
}

};
export default verifyAuthToken;
