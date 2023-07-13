import { Router } from "express";

import {
 
  // showActiveOrders,
  create,
  update,
  destroy,
  showOrders,
  addProduct,
  deleteProductOrder
} from "../handlers/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";
const routes = Router();

// api/orders/
routes.get("/", verifyAuthToken, showOrders);
// routes.get("/active-orders", verifyAuthToken, showActiveOrders);
routes.post("/:orders/cart", verifyAuthToken, addProduct);
routes.post("/", verifyAuthToken, create);
// update the state
routes.put("/:id/complete", verifyAuthToken, update);

routes.delete("/:id/product/:product/cart", verifyAuthToken, deleteProductOrder);
routes.delete("/:id", verifyAuthToken, destroy);




export default routes;
