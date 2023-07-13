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

      const sql5 = `SELECT * FROM orders_products WHERE product_id=$1`;
      const result5 = await connection.query(sql5,[product_id])
      if (!result5.rows[0]) {
        const sql =
        `INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();
      return result.rows[0];
      }
      const sql3 = `SELECT product_id FROM orders_products WHERE product_id=$1`
      const result3 = await connection.query(sql3,[product_id]);

      if(result3.rows[0].product_id == product_id){

        const sql4 = `UPDATE orders_products SET quantity = quantity + ($1) WHERE product_id=$2`
        const result4 = await connection.query(sql4, [quantity,product_id]);
        connection.release();
      return result4.rows[0]

      }else{
        const sql =
        `INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();
      return result.rows[0];
    }
      
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to add product to order${order_id}${product_id} in database ${error}`);
    }
  }

  async delete(productId: number, orderId: number, userId: number): Promise<orderProdType[]> {
    try {
      const connection = await Client.connect();

      const sql1 = `SELECT status, user_id FROM orders WHERE id = $1`;
      const result1 = await connection.query(sql1, [orderId]);
      const useriddb = parseInt(result1.rows[0].user_id)
      if (useriddb !== userId) {
        throw new Error("You are not the owner of this order");
      }

      let sql = `DELETE from orders_products WHERE product_id =($1) AND order_id=($2)`;
      let result3 = await connection.query(sql, [productId, orderId]);
      
    
      connection.release();

 
   

      return result3.rows
    } catch (err) {
      throw new Error(`Could not delete product ${productId}. Error: ${err}`);
    }
  }
}
