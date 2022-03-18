import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUserCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;

        // To take the file
        const avatar_file = req.file.filename;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUserCase
        );

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController };
