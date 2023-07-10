import { UserStore } from "../../models/user";
import Client from "../../database";

const userStore = new UserStore();

describe("⚙️ User Model Spec -------------- ⚙️", () => {
  beforeAll(async () => {
    const connection = await Client.connect();
    const sql = `
    DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n
    DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
    DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
    DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n`;
    await connection.query(sql);
    connection.release();
  });

  //   -------------------toBeDefined---------------------

  it("Should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });

  it("Should have a show method", () => {
    expect(userStore.show).toBeDefined();
  });

  it("Should have a create method", () => {
    expect(userStore.create).toBeDefined();
  });

  it("Should have a delete method", () => {
    expect(userStore.delete).toBeDefined();
  });

  //   ----------------------------------------

  it("create method should add a user", async () => {
    const result = await userStore.create({
      firstname: "sarah",
      lastname: "althowebi",
      email: "sarah@gmail.com",
      password: "sarah123",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "sarah",
      lastname: "althowebi",
      email: "sarah@gmail.com",
    });
  });

  it("Index method should return the all user", async () => {
    const result = await userStore.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "sarah",
        lastname: "althowebi",
        email: "sarah@gmail.com",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await userStore.show("1");

    expect(result).toEqual({
      id: 1,
      firstname: "sarah",
      lastname: "althowebi",
      email: "sarah@gmail.com",
    });
  });

  it("update method should update the correct user", async () => {
    const result = await userStore.update(
      {
        firstname: "udacity",
        lastname: "ud",
        email: "ud@gmail.com",
        password: "udacity123",
      },
      "1"
    );
    expect(result).toEqual({
      id: 1,
      firstname: "udacity",
      lastname: "ud",
      email: "ud@gmail.com",
    });
  });

  it("delete method should remove the user", async () => {
    const result = await userStore.delete("1");
    expect(result).toEqual({
      id: 1,
      firstname: "udacity",
      lastname: "ud",
      email: "ud@gmail.com",
    });
  });

  //   -----------------END-----------------------
});
