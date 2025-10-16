"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var iframe_rpc_exports = {};
__export(iframe_rpc_exports, {
  IFrameRPC: () => IFrameRPC
});
module.exports = __toCommonJS(iframe_rpc_exports);
var import_events = __toESM(require("events"), 1);
var import_iframe_rpc_error = require('./iframe-rpc-error.cjs');
var import_types = require('./types.cjs');
function responseObjToError(obj) {
  return new import_iframe_rpc_error.IFrameRPCError(obj.message, obj.code);
}
const readyId = -1;
class IFrameRPC extends import_events.default {
  /**
   * Creates an instance of IFrameRPC.
   * @param options The configuration options for IFrameRPC.
   */
  constructor(options) {
    super();
    this.options = options;
    this.removeMessageListener = (options.receiver || import_types.windowReceiver).readMessages(this.messageEventListener);
    this.isReady = this.createReadyPromise();
  }
  isReady;
  calls = /* @__PURE__ */ Object.create(null);
  lastCallId = 0;
  remoteProtocolVersion;
  removeMessageListener;
  createReadyPromise() {
    return new Promise((resolve) => {
      const response = { protocolVersion: this.options.protocolVersion || "1.0" };
      this.bindMethodHandler("ready", () => {
        resolve();
        return response;
      });
      this.callMethod("ready", response).then(resolve).catch(resolve);
    });
  }
  /**
   * Static method to get a ready instance of IFrameRPC based on the provided options.
   * @param options The configuration options for IFrameRPC.
   * @returns A Promise that resolves to the ready IFrameRPC instance.
   */
  static getReadyInstance(options) {
    const rpc = new IFrameRPC(options);
    return rpc.isReady.then(() => rpc);
  }
  /**
   * Binds a method handler for the specified RPC method.
   * @param method The RPC method name.
   * @param handler The method handler function.
   * @returns The current IFrameRPC instance.
   */
  bindMethodHandler(method, handler) {
    this.on(method, (data) => {
      new Promise((resolve) => resolve(handler(data.params))).then((result) => ({
        type: "response",
        requesterId: this.options.requesterId,
        id: data.id,
        result
      })).catch((err) => ({
        type: "response",
        requesterId: this.options.requesterId,
        id: data.id,
        error: err instanceof import_iframe_rpc_error.IFrameRPCError ? err.toResponseError() : { code: 0, message: err.stack || err.message }
      })).then((message) => {
        this.emit("sendResponse", message);
        this.post(message);
      });
    });
    return this;
  }
  /**
   * Calls an RPC method with the specified method name and parameters.
   * @param method The RPC method name.
   * @param params The parameters for the RPC method.
   * @returns A Promise that resolves with the result of the RPC method.
   */
  callMethod(method, params) {
    const id = method === "ready" ? readyId : this.lastCallId;
    const message = {
      type: "method",
      requesterId: this.options.requesterId,
      id,
      params,
      method
    };
    this.emit("sendMethod", message);
    this.post(message);
    return new Promise((resolve, reject) => {
      this.calls[id] = (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
    });
  }
  /**
   * Destroys the IFrameRPC instance, removing event listeners.
   */
  destroy() {
    this.emit("destroy");
    this.removeMessageListener();
  }
  /**
   * Retrieves the remote protocol version.
   * @returns The remote protocol version.
   */
  remoteVersion() {
    return this.remoteProtocolVersion;
  }
  handleResponse(message) {
    const handler = this.calls[message.id];
    if (!handler) {
      return;
    }
    if (message.error) {
      handler(responseObjToError(message.error), null);
    } else {
      handler(null, message.result);
    }
    delete this.calls[message.id];
  }
  post(message) {
    this.options.target.postMessage(JSON.stringify(message), this.options.origin || "*");
  }
  static isReadySignal(message) {
    if (message.type === "method" && message.method === "ready") {
      return true;
    }
    return message.type === "response" && message.id === readyId;
  }
  messageEventListener = (ev) => {
    if (this.options.origin && this.options.origin !== "*" && ev.origin !== this.options.origin) {
      return;
    }
    let message;
    try {
      message = JSON.parse(ev.data);
    } catch (e) {
      return;
    }
    if (!(0, import_types.isRPCMessage)(message) || message.requesterId !== this.options.requesterId) {
      return;
    }
    if (IFrameRPC.isReadySignal(message)) {
      const params = message.type === "method" ? message.params : message.result;
      this.remoteProtocolVersion = params?.protocolVersion ?? this.remoteProtocolVersion;
      this.emit("isReady", true);
      return;
    }
    this.emit("dataReceived", message);
    this.handleMessage(message);
  };
  handleMessage(message) {
    switch (message.type) {
      case "method":
        this.emit("methodReceived", message);
        if (this.listeners(message.method).length > 0) {
          this.emit(message.method, message);
          return;
        }
        this.post({
          type: "response",
          requesterId: this.options.requesterId,
          id: message.id,
          error: { code: 4003, message: `Unknown method name "${message.method}"` },
          result: null
        });
        break;
      case "response":
        this.emit("responseReceived", message);
        this.handleResponse(message);
        break;
      default:
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IFrameRPC
});
