import Client from "../../database";
import supertest from "supertest";
import app from "../../server";
import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";
import { UserStore } from "../../models/user";
import { OrdersProductsModel } from "../../models/cart";
import jwt from "jsonwebtoken";

const request = supertest(app);
const userStore = new UserStore();
const orderStore = new OrderStore();
const orderProductStore = new OrdersProductsModel();
const productStore = new ProductStore();

let order_id: number;
let user_id: number;
let prod_id: number;

const OrderProd = {
  order_id: 1,
  product_id: 1,
  quantity: 10,
};

const token = jwt.sign(OrderProd, process.env.TOKEN_SECRET as string);

describe("🚧 Order Product Endpoints  Test --------------- 🚧", () => {
  beforeAll(async () => {
    const connection = await Client.connect();
    await connection.query(
      "DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;"
    );
    await connection.query(
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;"
    );
    await connection.query(
      "DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;"
    );

    connection.release();
  });
  beforeAll(async () => {
    const user = await userStore.create({
      firstname: "Udacity",
      lastname: "UD",
      password: "udacity123",
      email: "udacity@gmail.com",
    });

    const prod = await productStore.create({
      name: "macbook",
      des: "macbook pro 16 inch",
      image: "blah.png",
      price: 0,
      category: "tech",
    });

    const order = await orderStore.create({
      status: "active",
      user_id: "2",
    });

    user_id = user.id as number;
    prod_id = prod.id as number;
    //    order_id = order.id as number
  });

  //   -------------------ROUTE---------------------
  it("test POST /orders/1/products", async () => {
    const response = await request.post("/orders/1/products").send({
      order_id: 1,
      product_id: 1,
      quantity: 10,
    });
    expect(response.status).toBe(401);
  });

  it("test POST /orders/1/products", async () => {
    const response = await request
      .post("/orders/1/products")
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  //   -------------------END---------------------
  afterAll(async () => {
    const connection = await Client.connect();
    const sql = `
            DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n
            DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
            DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
            DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n`;
    await connection.query(sql);
    connection.release();
  });
});
