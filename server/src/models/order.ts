import Client from "../database";
import { Order } from "../types/order-type";

export class OrderStore {
  // show list of orders by the user id : Profile
  async getUserOrders(user_Id: number): Promise<Order[]> {
    try {
      // get user's orders
      const connection = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await connection.query(sql, [user_Id]);
      // get order products
      const orders = await Promise.all(
        result.rows.map(async (order) => {
          const sql = `SELECT product_Id, quantity FROM orders_products WHERE order_Id = $1`;
          const orderProducts = await connection.query(sql, [order.id]);
          return {
            ...order,
            orderProducts: orderProducts.rows,
          };
        })
      );
      connection.release();
      return orders;
    } catch (error) {
      throw new Error(
        `Failed to get user orders from database ${user_Id}, ${error}`
      );
    }
  }

  // async getActiveOrders(user_Id: number): Promise<Order> {
  //   try {
  //     // get user's orders
  //     const connection = await Client.connect();
  //     const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'active';`;
  //     const result = await connection.query(sql, [user_Id]);
  //     // get order products
  //     console.log(result.rows[0].id)
  //     const products = await connection.query(
  //       `SELECT product_id, quantity FROM orders_products WHERE order_id = $1`,
  //       [result.rows[0].id]
  //     );
  //     const order = {
  //       ...result.rows[0],
  //       orderProducts: products.rows,
  //     };
  //     connection.release();
  //     return order;
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to get user orders from database ${user_Id}, ${error}`
  //     );
  //   }
  // }

  async create(user_id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO orders (status, user_id)  VALUES ($1, $2) RETURNING * ;`;

      const result = await connection.query(sql, ["active", user_id]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create an new order with user id ${user_id}. Error: ${err}`
      );
    }
  }

  async update(orderId: number, userId: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      // check that user is the order owner
      const sql1 = `SELECT status, user_id FROM orders WHERE id = $1`;
      const result1 = await connection.query(sql1, [orderId]);
      const useriddb = parseInt(result1.rows[0].user_id)
      if (useriddb !== userId) {
        throw new Error("You are not the owner of this order");
      }
      const sql = `UPDATE orders SET status = 'completed' WHERE id = $1 RETURNING *`;
      const result = await connection.query(sql, [orderId]);

      const products = await connection.query(
        `SELECT product_id, quantity FROM orders_products WHERE order_id = $1`,
        [result.rows[0].id]
      );

      const order = {
        ...result.rows[0],
        orderProducts: products.rows,
      };

      connection.release();
      return order;
    } catch (error) {
      throw new Error(
        `Unable to update the order with the order id ${orderId}, ${error}`
      );
    }
  }

  async delete(orderId: number, userId: number): Promise<Order> {
    try {
      const connection = await Client.connect();

      const sql1 = `SELECT status, user_id FROM orders WHERE id = $1`;
      const result1 = await connection.query(sql1, [orderId]);
      const useriddb = parseInt(result1.rows[0].user_id)
      if (useriddb !== userId) {
        throw new Error("You are not the owner of this order");
      }

      let sql = `DELETE from orders_products WHERE order_id =($1)`;
      let result3 = await connection.query(sql, [orderId]);
      
      sql = `DELETE FROM orders WHERE id=($1)`;

      const result = await connection.query(sql, [orderId]);
      connection.release();

      const order = {
        ...result.rows[0],
        orderProducts: result3.rows,
      };

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${orderId}. Error: ${err}`);
    }
  }


}
