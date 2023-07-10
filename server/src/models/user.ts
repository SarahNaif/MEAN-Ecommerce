import Client from "../database";
import { User, User_test } from "../types/user-type";

import {hash, comparePassword} from "../utils/hashPassword"


export class UserStore {

  async show(id: string): Promise<User> {
    const idNew: number = parseInt(id);
    try {
      const sql =
        "SELECT  * FROM users WHERE id=($1);";
      const conection = await Client.connect();

      const result = await conection.query(sql, [idNew]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${idNew}. Error: ${err}`);
    }
  }

  async showAll(): Promise<User[]> {
  
    try {
      const sql =
        "SELECT  * FROM users ;";
      const conection = await Client.connect();

      const result = await conection.query(sql);

      conection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find user . Error: ${err}`);
    }
  }

  
  async getByEmail(email: string): Promise<User | null> {
    try {
      const sql =
        "SELECT  * FROM users WHERE email=($1);";
      const conection = await Client.connect();

      const result = await conection.query(sql, [email]);
      
      if (result.rows.length === 0) return null

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with ${email}. Error: ${err}`);
    }
  }
 

  async create(user: User): Promise<User> {
    try {
      const conection = await Client.connect();
      const sql = `INSERT INTO users (firstname,lastname,email, password) VALUES($1, $2, $3, $4) RETURNING * ;`;

      const result = await conection.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hash(user.password),
      ]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.firstname} . Error: ${err}`
      );
    }
  }


  async update(user: User, id: string): Promise<User> {
    const idNew: number = parseInt(id);
    try {
      const connection = await Client.connect();
      const sql = `UPDATE users
                       SET firstname=$1, lastname=$2, password=$3 , email=$4
                       WHERE id=($5)
                       RETURNING *`;

      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        hash(user.password),
        user.email,
        idNew,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update the user with the id ${user.id}, ${error}`);
    }
  }

  async delete(id: string): Promise<User> {
    const idNew: number = parseInt(id);
    try {
      const conection = await Client.connect();
      const sql =
        "DELETE FROM users WHERE id=($1) RETURNING * ;";

      const result = await conection.query(sql, [idNew]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE email=($1)";
      const result = await conn.query(sql, [email]);

     
      if (result?.rows?.length) {
        const user = result.rows[0];
        const validPassword = await comparePassword(password, user.password);

        if (validPassword) {
          conn.release();
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
