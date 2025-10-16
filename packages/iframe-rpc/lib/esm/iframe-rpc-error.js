class IFrameRPCError extends Error {
  constructor(message, code) {
    super(`Error #${code}: ${message}`);
    this.message = message;
    this.code = code;
  }
  toResponseError() {
    return {
      code: this.code,
      message: this.message
    };
  }
}
export {
  IFrameRPCError
};
