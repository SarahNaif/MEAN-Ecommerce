import Client from "../../database";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
const request = supertest(app);

const User = {
  firstname: "sarah",
  lastname: "althowebi",
  email: "sarah@gmail.com",
  password: "sarah123",
};
const token = jwt.sign(User, process.env.TOKEN_SECRET as string);
describe("🚧  Users Endpoints Test --------------- 🚧 ", () => {
  //   -------------------ROUTE---------------------
  it("test POST /users", async () => {
    const response = await request.post("/register").send({
      firstname: "sarah",
      lastname: "althowebi",
      email: "sarah@gmail.com",
      password: "sarah123",
    });

    expect(response.status).toBe(200);
  });
  // ---------------------
  it("test GET /users all ", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });

  it("test GET /users all with JWT", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // ---------------------
  it("test GET /users by id", async () => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(401);
  });
  it("test GET /users by id with JWT", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // ---------------------
  it("test PUT /users ", async () => {
    const response = await request.put("/users/1").send({
      firstname: "udacity",
      lastname: "ud",
      email: "ud@udacity.com",
      password: "udacity123",
    });
    expect(response.status).toBe(401);
  });

  it("test PUT /users with JWT", async () => {
    const response = await request
      .put("/users/1")
      .send({
        firstname: "udacity",
        lastname: "ud",
        email: "ud@udacity.com",
        password: "udacity123",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // ---------------------
  it("test DELETE /users by id", async () => {
    const response = await request.delete("/users/1");
    expect(response.status).toBe(401);
  });
  it("test DELETE /users by id with JWT", async () => {
    const response = await request
      .delete("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // ---------------------
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
