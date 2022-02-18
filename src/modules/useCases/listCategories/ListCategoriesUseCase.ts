import { Category } from "../../Cars/entities/Category";
import { CategoriesRepository } from "../../Cars/repositories/implementations/CategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}
    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
