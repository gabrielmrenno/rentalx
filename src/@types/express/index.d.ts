declare namespace Express {
    // Overwrite the Request information
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        // To pass the property "user" with id (string) attribute
        user: {
            id: string;
        };
    }
}
