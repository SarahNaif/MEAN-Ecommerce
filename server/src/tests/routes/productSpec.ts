import Client from "../../database";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const request = supertest(app);

const Prod = {
  firstname: "sarah",
  lastname: "althowebi",
  email: "sarah@gmail.com",
  password: "sarah123",
};

const token = jwt.sign(Prod, process.env.TOKEN_SECRET as string);
describe("🚧 Product Endpoints Test --------------- 🚧", () => {
  //   -------------------ROUTE---------------------
  it("test POST /products", async () => {
    const response = await request.post("/products").send({
      name: "macbook pro",
      des: "macbook pro 13 inch",
      image: "macbook image",
      price: 9,
      category: "TECH",
    });

    expect(response.status).toBe(401);
  });

  it("test POST /products with JWT", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "macbook pro",
        des: "macbook pro 13 inch",
        image: "macbook image",
        price: 9,
        category: "TECH",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  // ----------------------------------------------
  it("test GET /products all", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("test GET /products/category by category", async () => {
    const response = await request.get("/products/category").send({
      category: "TECH",
    });
    expect(response.status).toBe(200);
  });

  it("test GET /products by id", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
  // ----------------------------------------------
  it("test PUT /products", async () => {
    const response = await request.put("/products/1").send({
      name: "Ipad pro",
      des: "Ipad pro 12 inch",
      image: "Ipad pro image",
      price: 9,
      category: "TECH",
    });
    expect(response.status).toBe(401);
  });

  it("test PUT /products", async () => {
    const response = await request
      .put("/products/1")
      .send({
        name: "Ipad pro",
        des: "Ipad pro 12 inch",
        image: "Ipad pro image",
        price: 9,
        category: "TECH",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // ----------------------------------------------
  it("test DELETE /products by id", async () => {
    const response = await request.delete("/products/1");
    expect(response.status).toBe(401);
  });

  it("test DELETE /products by id", async () => {
    const response = await request
      .delete("/products/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  //   -------------------END---------------------
});
