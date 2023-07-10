import { Router } from "express";

import {
  showall,
  show,
  create,
  update,
  destroy,
  authenticate,
} from "../handlers/users";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const routes = Router();

// routes.get("/users", verifyAuthToken, index);

routes.post("/login", authenticate);
routes.get("/", showall);
routes.post("/register", create);
routes.get("/profile/:id", verifyAuthToken, show);
routes.put("/profile/:id", verifyAuthToken, update);
routes.delete("/profile/:id", verifyAuthToken, destroy);

export default routes;
