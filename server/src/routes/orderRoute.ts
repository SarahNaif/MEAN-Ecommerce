import { Router } from "express";

import {
 
  // showActiveOrders,
  create,
  update,
  destroy,
  showOrders,
  addProduct,
} from "../handlers/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";
const routes = Router();

// api/orders/
routes.get("/", verifyAuthToken, showOrders);
// routes.get("/active-orders", verifyAuthToken, showActiveOrders);
routes.post("/:orders/products", verifyAuthToken, addProduct);
routes.post("/", verifyAuthToken, create);
// update the state
routes.put("/:id/complete", verifyAuthToken, update);

routes.delete("/:id", verifyAuthToken, destroy);




export default routes;
