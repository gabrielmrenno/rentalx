import { Router } from "express";

import { createSpecificationController } from "../modules/useCases/createSpecification";

const specficationsRoutes = Router();

specficationsRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

export { specficationsRoutes };
