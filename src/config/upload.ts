import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default function upload(folder: string) {
    return {
        storage: multer.diskStorage({
            // File destination
            destination: resolve(__dirname, "..", "..", folder),
            // Create a randomly hash, to concatenate with filename
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(16).toString("hex");
                const fileName = `${fileHash} - ${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    };
}
