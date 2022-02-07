import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specficationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specficationsRoutes);

export { router };
