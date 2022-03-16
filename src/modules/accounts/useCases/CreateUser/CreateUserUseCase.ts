import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const emailAlreadyExists = await this.userRepository.findByEmail(email);

        if (emailAlreadyExists) {
            throw new AppError("Email is already used by another user");
        }

        await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }
}
