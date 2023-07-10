import { ProductStore } from "../../models/product";
import Client from "../../database";

const productStore = new ProductStore();

describe("⚙️ Product Model Spec --------------- ⚙️", () => {
  beforeAll(async () => {
    const connection = await Client.connect();
    const sql = `DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`;
    await connection.query(sql);
    connection.release();
  });

  //   -------------------toBeDefined---------------------

  it("Should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("Should have a show method", () => {
    expect(productStore.show).toBeDefined();
  });

  it("Should have a create method", () => {
    expect(productStore.create).toBeDefined();
  });

  it("Should have a delete method", () => {
    expect(productStore.delete).toBeDefined();
  });

  //   ----------------------------------------

  it("create method should add a product", async () => {
    const result = await productStore.create({
      name: "13-inch MacBook Air M2",
      des: "RAM 24GB",
      image: "shorturl.at/egFUX",
      price: 9999,
      category: "TECH",
    });
    expect(result).toEqual({
      id: 1,
      name: "13-inch MacBook Air M2",
      des: "RAM 24GB",
      image: "shorturl.at/egFUX",
      price: 9999,
      category: "TECH",
    });
  });

  it("index method should return all products", async () => {
    const result = await productStore.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("show method should return the correct product", async () => {
    const result = await productStore.show("1");
    expect(result).toEqual({
      id: 1,
      name: "13-inch MacBook Air M2",
      des: "RAM 24GB",
      image: "shorturl.at/egFUX",
      price: 9999,
      category: "TECH",
    });
  });

  it("category method should return the correct category", async () => {
    const result = await productStore.category("TECH");
    expect(result).toEqual([
      {
        id: 1,
        name: "13-inch MacBook Air M2",
        des: "RAM 24GB",
        image: "shorturl.at/egFUX",
        price: 9999,
        category: "TECH",
      },
    ]);
  });

  it("update method should update the correct product", async () => {
    const result = await productStore.update(
      {
        name: "16-inch MacBook Air M2",
        des: "RAM 8GB",
        image: "shorturl.at/egFUX",
        price: 99,
        category: "TECH",
      },
      "1"
    );
    expect(result).toEqual({
      id: 1,
      name: "16-inch MacBook Air M2",
      des: "RAM 8GB",
      image: "shorturl.at/egFUX",
      price: 99,
      category: "TECH",
    });
  });

  it("delete method should delete the correct product", async () => {
    const result = await productStore.delete("1");
    expect(result).toEqual({
      id: 1,
      name: "16-inch MacBook Air M2",
      des: "RAM 8GB",
      image: "shorturl.at/egFUX",
      price: 99,
      category: "TECH",
    });
  });

  //   -----------------END-----------------------

  afterAll(async () => {
    const connection = await Client.connect();
    const sql = `DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`;
    await connection.query(sql);
    connection.release();
  });
});
