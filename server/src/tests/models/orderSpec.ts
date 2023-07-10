import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";
import Client from "../../database";

const orderStore = new OrderStore();
const userStore = new UserStore();

describe("⚙️ Order Model  -------------- ⚙️", () => {
  beforeAll(async () => {
    const connection = await Client.connect();
    const sql = `
        DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n
        DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
        DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n
        DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
        `;
    await connection.query(sql);
    connection.release();
  });

  beforeAll(async () => {
    await userStore.create({
      firstname: "Udacity",
      lastname: "UD",
      password: "udacity123",
      email: "udacity@gmail.com",
    });
  });

  afterAll(async () => {
    const connection = await Client.connect();
    const sql = `
  DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n
  DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
  DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n
 
  `;
    await connection.query(sql);
    connection.release();
  });

  //   -------------------toBeDefined---------------------

  it("Should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it("Should have a show method", () => {
    expect(orderStore.show).toBeDefined();
  });

  it("Should have a ordersByUser method", () => {
    expect(orderStore.ordersByUser).toBeDefined();
  });

  it("Should have a create method", () => {
    expect(orderStore.create).toBeDefined();
  });
  it("Should have a update method", () => {
    expect(orderStore.update).toBeDefined();
  });

  it("Should have a delete method", () => {
    expect(orderStore.delete).toBeDefined();
  });

  //   ----------------------------------------

  it("create method should create a new order", async () => {
    const result = await orderStore.create({
      status: "active",
      user_id: "1",
    });

    expect(result).toEqual({
      id: 1,
      status: "active",
      user_id: "1",
    });
  });

  it("index method should return all orders", async () => {
    const orders = await orderStore.index();
    expect(orders).toEqual([
      {
        id: 1,
        status: "active",
        user_id: "1",
      },
    ]);
  });

  it("Show method should return a Order", async () => {
    const result = await orderStore.show("1");
    expect(result).toEqual({
      id: 1,
      status: "active",
      user_id: "1",
    });
  });

  it("Show method should return all orders by the user id ", async () => {
    const result = await orderStore.ordersByUser("1");
    expect(result).toEqual([
      {
        id: 1,
        status: "active",
        user_id: "1",
      },
    ]);
  });

  it("update method should update the correct order", async () => {
    const result = await orderStore.update(
      {
        status: "caneled",
        user_id: "1",
      },
      "1"
    );
    expect(result).toEqual({
      id: 1,
      status: "caneled",
      user_id: "1",
    });
  });

  it("delete method should remove the order", async () => {
    orderStore.delete("1");
    const result = await orderStore.index();
    expect(result).toEqual([]);
  });

  //   -----------------END-----------------------
});
