function isRPCMessage(data) {
  return (data.type === "method" || data.type === "response") && typeof data.id === "number" && typeof data.requesterId === "string";
}
const windowReceiver = {
  readMessages(callback) {
    window.addEventListener("message", callback);
    return () => window.removeEventListener("message", callback);
  }
};
export {
  isRPCMessage,
  windowReceiver
};
