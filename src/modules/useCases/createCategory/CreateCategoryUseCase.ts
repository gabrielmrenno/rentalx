import { ICategoriesRepository } from "../../Cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const ifCategoryExists = await this.categoriesRepository.findByName(
            name
        );

        if (ifCategoryExists) {
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
