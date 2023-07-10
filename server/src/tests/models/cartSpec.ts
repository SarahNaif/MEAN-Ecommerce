import Client from "../../database";
import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";
import { UserStore } from "../../models/user";
import { OrdersProductsModel } from "../../models/cart";

const userStore = new UserStore();
const orderStore = new OrderStore();
const orderProductStore = new OrdersProductsModel();
const productStore = new ProductStore();

let order_id: number;
let user_id: number;
let prod_id: number;

describe("⚙️Orders Products Model  -------------- ⚙️", () => {
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
      user_id: "1",
    });

    user_id = user.id as number;
    prod_id = prod.id as number;
    order_id = order.id as number;
  });

  //   -------------------toBeDefined---------------------

  it("Add product to order shoud be defined", async () => {
    expect(orderProductStore.create).toBeDefined();
  });
  //   ----------------------------------------

  it("should add a product order", async () => {
    const result = await orderProductStore.create(order_id, prod_id, 3);
    expect(result.quantity).toEqual(3);
  });

  //   -----------------END-----------------------

  afterAll(async () => {
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
    await connection.query(
      "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;"
    );
    connection.release();
  });

  // it("USERS", async () => {
  //   const res = await userStore.index();
  //   console.log(res);
  // });
});
