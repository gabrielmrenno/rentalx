import { ISpecificationsRepository } from "../../Cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}
    execute({ name, description }: IRequest): void {
        const ifRepositoryExists =
            this.specificationsRepository.findByName(name);

        if (ifRepositoryExists) {
            throw new Error("Specification already exists");
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
