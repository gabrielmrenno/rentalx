import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // authHeader = "Bearer ndajshashdgasda6s8d (token)"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token Missing", 401);
    }

    // To split Bearer and token from authHeader, using split method with " " (space) delimiter
    const [, token] = authHeader.split(" ");

    // Verify token is valid
    try {
        // sub (data returned of verify method) is the user id
        const { sub: user_id } = verify(
            token,
            "ea8f3627e94982bfb95b4a4c198e18b2"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exist", 401);
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}

export { ensureAuthenticated };
