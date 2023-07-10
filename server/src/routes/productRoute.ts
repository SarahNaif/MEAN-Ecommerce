import { Router } from "express";

import {
  index,
  category,
  show,
  create,
  update,
  destroy,
} from "../handlers/products";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const routes = Router();
routes.get("/:category", category);
routes.get("/", index);
routes.get("/:id", show);
routes.post("/", verifyAuthToken, create);
routes.put("/:id", verifyAuthToken, update);
routes.delete("/:id", verifyAuthToken, destroy);



export default routes;
