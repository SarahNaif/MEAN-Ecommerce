import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUND;
const pepper = process.env.BCRYPT_PASSWORD;

export const  hash = (password: string) => {
    const salt = parseInt(saltRounds as string);
    return bcrypt.hashSync(password + pepper, salt);
  };


  export const comparePassword = (password: string, enteredPassword:string)=>{
    return bcrypt.compare(
        password + pepper,
        enteredPassword,
      );

  }