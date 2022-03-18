import fs from "fs";

export const deleteFile = async (filename: string) => {
    // Verify if the "filename" exists in the directory
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    await fs.promises.unlink(filename);
};
