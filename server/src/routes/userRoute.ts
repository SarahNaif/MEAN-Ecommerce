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



routes.post("/login", authenticate);
routes.get("/", showall);
routes.post("/register", create);

routes.get("/profile", verifyAuthToken, show);
routes.put("/profile", verifyAuthToken, update);
routes.delete("/profile", verifyAuthToken, destroy);

export default routes;
