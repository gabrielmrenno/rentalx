import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
    async handle(req: Request, res: Response): Promise<Response> {
        const data = await this.listCategoriesUseCase.execute();

        return res.status(201).json(data);
    }
}

export { ListCategoriesController };
