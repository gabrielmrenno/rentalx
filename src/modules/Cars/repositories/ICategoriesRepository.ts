import { Category } from "../model/Category";

interface ICategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICategoryDTO): void;
    findByName(name: string): Category;
    list(): Category[];
}

export { ICategoriesRepository, ICategoryDTO };
