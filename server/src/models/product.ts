import Client from "../database";
import { Product } from "../types/product-type";

export class ProductStore {
  
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO products (name,des,image,price, category) VALUES($1, $2, $3, $4, $5) RETURNING *;`;

      const result = await connection.query(sql, [
        product.name,
        product.des,
        product.image,
        product.price,
        product.category,
      ]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    }
  }

  async uploadImage(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO products (image) VALUES($1) RETURNING *;`;

      const result = await connection.query(sql, [
        product.image,
      ]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    }
  }

  async category(category: string): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE category = ($1);";
      const result = await connection.query(sql, [category]);

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Unable to show products by category ${category}, ${error}`
      );
    }
  }

  // Updating a product
  async update(product: Product, id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `UPDATE products
                   SET name=$1, des=$2,image=$3,price=$4, category=$5
                   WHERE id=($6)
                   RETURNING id, name, des, image,price, category`;
             
      const result = await connection.query(sql, [
        product.name,
        product.des,
        product.image,
        product.price,
        product.category,
        id,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update the product with the id ${id}, ${error}`
      );
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING * ;";

      const result = await connection.query(sql, [id]);
      
      connection.release();
      const prod = result.rows[0];
      if(!prod){
        throw new Error(`Product Could not Found ${id}.`);
      }
      console.log(prod)
      return prod
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
