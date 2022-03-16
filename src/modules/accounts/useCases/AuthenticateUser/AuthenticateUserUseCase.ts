import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IReturn {
    user: {
        email: string;
        name: string;
    };
    token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IReturn> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, "ea8f3627e94982bfb95b4a4c198e18b2", {
            subject: user.id,
            expiresIn: "1d",
        });

        return {
            user,
            token,
        };
    }
}
