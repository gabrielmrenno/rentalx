import { Category } from "../../Cars/model/Category";
import { CategoriesRepository } from "../../Cars/repositories/implementations/CategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}
    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
