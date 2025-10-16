declare class IFrameRPCError extends Error {
    readonly message: string;
    readonly code: number;
    constructor(message: string, code: number);
    toResponseError(): {
        code: number;
        message: string;
    };
}

export { IFrameRPCError };
