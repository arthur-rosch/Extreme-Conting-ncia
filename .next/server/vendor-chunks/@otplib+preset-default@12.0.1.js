"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@otplib+preset-default@12.0.1";
exports.ids = ["vendor-chunks/@otplib+preset-default@12.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@otplib+preset-default@12.0.1/node_modules/@otplib/preset-default/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@otplib+preset-default@12.0.1/node_modules/@otplib/preset-default/index.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * @otplib/preset-default\n *\n * @author Gerald Yeo <contact@fusedthought.com>\n * @version: 12.0.1\n * @license: MIT\n **/\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar pluginCrypto = __webpack_require__(/*! @otplib/plugin-crypto */ \"(ssr)/./node_modules/.pnpm/@otplib+plugin-crypto@12.0.1/node_modules/@otplib/plugin-crypto/index.js\");\nvar pluginThirtyTwo = __webpack_require__(/*! @otplib/plugin-thirty-two */ \"(ssr)/./node_modules/.pnpm/@otplib+plugin-thirty-two@12.0.1/node_modules/@otplib/plugin-thirty-two/index.js\");\nvar core = __webpack_require__(/*! @otplib/core */ \"(ssr)/./node_modules/.pnpm/@otplib+core@12.0.1/node_modules/@otplib/core/index.js\");\n\nconst hotp = new core.HOTP({\n  createDigest: pluginCrypto.createDigest\n});\nconst totp = new core.TOTP({\n  createDigest: pluginCrypto.createDigest\n});\nconst authenticator = new core.Authenticator({\n  createDigest: pluginCrypto.createDigest,\n  createRandomBytes: pluginCrypto.createRandomBytes,\n  keyDecoder: pluginThirtyTwo.keyDecoder,\n  keyEncoder: pluginThirtyTwo.keyEncoder\n});\n\nexports.authenticator = authenticator;\nexports.hotp = hotp;\nexports.totp = totp;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQG90cGxpYitwcmVzZXQtZGVmYXVsdEAxMi4wLjEvbm9kZV9tb2R1bGVzL0BvdHBsaWIvcHJlc2V0LWRlZmF1bHQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7O0FBRTdELG1CQUFtQixtQkFBTyxDQUFDLGtJQUF1QjtBQUNsRCxzQkFBc0IsbUJBQU8sQ0FBQyw4SUFBMkI7QUFDekQsV0FBVyxtQkFBTyxDQUFDLHVHQUFjOztBQUVqQztBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQscUJBQXFCO0FBQ3JCLFlBQVk7QUFDWixZQUFZIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVycm9zY2gvRGVza3RvcC9FeHRyZW1lLUNvbnRpbmctbmNpYS9ub2RlX21vZHVsZXMvLnBucG0vQG90cGxpYitwcmVzZXQtZGVmYXVsdEAxMi4wLjEvbm9kZV9tb2R1bGVzL0BvdHBsaWIvcHJlc2V0LWRlZmF1bHQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAb3RwbGliL3ByZXNldC1kZWZhdWx0XG4gKlxuICogQGF1dGhvciBHZXJhbGQgWWVvIDxjb250YWN0QGZ1c2VkdGhvdWdodC5jb20+XG4gKiBAdmVyc2lvbjogMTIuMC4xXG4gKiBAbGljZW5zZTogTUlUXG4gKiovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBwbHVnaW5DcnlwdG8gPSByZXF1aXJlKCdAb3RwbGliL3BsdWdpbi1jcnlwdG8nKTtcbnZhciBwbHVnaW5UaGlydHlUd28gPSByZXF1aXJlKCdAb3RwbGliL3BsdWdpbi10aGlydHktdHdvJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJ0BvdHBsaWIvY29yZScpO1xuXG5jb25zdCBob3RwID0gbmV3IGNvcmUuSE9UUCh7XG4gIGNyZWF0ZURpZ2VzdDogcGx1Z2luQ3J5cHRvLmNyZWF0ZURpZ2VzdFxufSk7XG5jb25zdCB0b3RwID0gbmV3IGNvcmUuVE9UUCh7XG4gIGNyZWF0ZURpZ2VzdDogcGx1Z2luQ3J5cHRvLmNyZWF0ZURpZ2VzdFxufSk7XG5jb25zdCBhdXRoZW50aWNhdG9yID0gbmV3IGNvcmUuQXV0aGVudGljYXRvcih7XG4gIGNyZWF0ZURpZ2VzdDogcGx1Z2luQ3J5cHRvLmNyZWF0ZURpZ2VzdCxcbiAgY3JlYXRlUmFuZG9tQnl0ZXM6IHBsdWdpbkNyeXB0by5jcmVhdGVSYW5kb21CeXRlcyxcbiAga2V5RGVjb2RlcjogcGx1Z2luVGhpcnR5VHdvLmtleURlY29kZXIsXG4gIGtleUVuY29kZXI6IHBsdWdpblRoaXJ0eVR3by5rZXlFbmNvZGVyXG59KTtcblxuZXhwb3J0cy5hdXRoZW50aWNhdG9yID0gYXV0aGVudGljYXRvcjtcbmV4cG9ydHMuaG90cCA9IGhvdHA7XG5leHBvcnRzLnRvdHAgPSB0b3RwO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@otplib+preset-default@12.0.1/node_modules/@otplib/preset-default/index.js\n");

/***/ })

};
;