import express, { Request, Response, NextFunction } from "express";
import "express-async-error";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "./shared/container";
import "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

app.listen(3333);
