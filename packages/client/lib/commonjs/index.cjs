"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
__export(index_exports, {
  formatNearAmount: () => import_utils.formatNearAmount
});
module.exports = __toCommonJS(index_exports);
var import_utils = require("@near-js/utils");
__reExport(index_exports, require('./constants.cjs'), module.exports);
__reExport(index_exports, require('./crypto.cjs'), module.exports);
__reExport(index_exports, require('./funded_account.cjs'), module.exports);
__reExport(index_exports, require('./interfaces/index.cjs'), module.exports);
__reExport(index_exports, require('./providers.cjs'), module.exports);
__reExport(index_exports, require('./signing/index.cjs'), module.exports);
__reExport(index_exports, require('./transactions/index.cjs'), module.exports);
__reExport(index_exports, require('./view.cjs'), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatNearAmount,
  ...require('./constants.cjs'),
  ...require('./crypto.cjs'),
  ...require('./funded_account.cjs'),
  ...require('./interfaces/index.cjs'),
  ...require('./providers.cjs'),
  ...require('./signing/index.cjs'),
  ...require('./transactions/index.cjs'),
  ...require('./view.cjs')
});
