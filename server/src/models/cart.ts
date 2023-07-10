import Client from "../database";
import { orderProdType } from "../types/order-type";

export class OrdersProductsModel {

  async addOrderProduct(
    order_id: number,
    product_id: number,
    user_Id: number,
    quantity: number
  ): Promise<orderProdType> {
    try {
      const connection = await Client.connect();

      const sql1 = `SELECT status, user_id FROM orders WHERE id = $1`;
      const result1 = await connection.query(sql1, [order_id]);
      const useriddb = parseInt(result1.rows[0].user_id)
 
      if (useriddb  !== user_Id ) {
        throw new Error("You are not the owner of this order");
      }

      if (result1.rows[0].status !== "active") {
        throw new Error("Order is not active");
      }
      // check that product exists
      const sql2 = `SELECT * FROM products WHERE id = $1`;
      const result2 = await connection.query(sql2, [product_id]);
      if (!result2.rows[0]) {
        throw new Error("Product does not exist");
      }

      const sql =
        `INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      console.log("Error is here : "+error)
      throw new Error(`Failed to add product to order in database ${error}`);
    }
  }
}
