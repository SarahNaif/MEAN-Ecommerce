import Client from "../../database";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import { UserStore } from "../../models/user";

const request = supertest(app);
const userStore = new UserStore();
const Order = {
  status: "active",
  user_id: 1,
};
const token = jwt.sign(Order, process.env.TOKEN_SECRET as string);

describe("🚧 Order Endpoints Test --------------- 🚧", () => {
  beforeAll(async () => {
    await userStore.create({
      firstname: "Udacity",
      lastname: "UD",
      password: "udacity123",
      email: "udacity@gmail.com",
    });
  });
  it("CHECK USERS", async () => {
    const res = await userStore.index();
    console.log(res);
  });

  //   -------------------ROUTE---------------------

  it("test POST /orders", async () => {
    const response = await request.post("/orders").send({
      status: "active",
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it("test POST /orders", async () => {
    const response = await request
      .post("/orders")
      .send({
        status: "active",
        user_id: 1,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // ----------------------------------------------

  it("test GET /orders all", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(401);
  });

  it("test GET /orders all", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // ----------------------------------------------

  it("test GET /orders by id", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(401);
  });

  it("test GET /orders by id", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // ----------------------------------------------

  it("test PUT /orders", async () => {
    const response = await request.put("/orders/1").send({
      status: "canceld",
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it("test PUT /orders", async () => {
    const response = await request
      .put("/orders/1")
      .send({
        status: "canceld",
        user_id: 1,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // ----------------------------------------------

  it("test DELETE /orders by id", async () => {
    const response = await request.delete("/orders/1");
    expect(response.status).toBe(401);
  });

  it("test DELETE /orders by id", async () => {
    const response = await request
      .delete("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // ----------------------------------------------

  it("tests GET/ orderByUser response )", async () => {
    const response = await request.get("/orders/1/users");
    expect(response.status).toEqual(401);
  });

  it("tests GET/ orderByUser response )", async () => {
    const response = await request
      .get("/orders/1/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
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
