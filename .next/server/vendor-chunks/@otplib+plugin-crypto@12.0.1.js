"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@otplib+plugin-crypto@12.0.1";
exports.ids = ["vendor-chunks/@otplib+plugin-crypto@12.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@otplib+plugin-crypto@12.0.1/node_modules/@otplib/plugin-crypto/index.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@otplib+plugin-crypto@12.0.1/node_modules/@otplib/plugin-crypto/index.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * @otplib/plugin-crypto\n *\n * @author Gerald Yeo <contact@fusedthought.com>\n * @version: 12.0.1\n * @license: MIT\n **/\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar crypto = _interopDefault(__webpack_require__(/*! crypto */ \"crypto\"));\n\nconst createDigest = (algorithm, hmacKey, counter) => {\n  const hmac = crypto.createHmac(algorithm, Buffer.from(hmacKey, 'hex'));\n  const digest = hmac.update(Buffer.from(counter, 'hex')).digest();\n  return digest.toString('hex');\n};\nconst createRandomBytes = (size, encoding) => {\n  return crypto.randomBytes(size).toString(encoding);\n};\n\nexports.createDigest = createDigest;\nexports.createRandomBytes = createRandomBytes;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQG90cGxpYitwbHVnaW4tY3J5cHRvQDEyLjAuMS9ub2RlX21vZHVsZXMvQG90cGxpYi9wbHVnaW4tY3J5cHRvL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7O0FBRWIsOENBQTZDLEVBQUUsYUFBYSxFQUFDOztBQUU3RCxnQ0FBZ0M7O0FBRWhDLDZCQUE2QixtQkFBTyxDQUFDLHNCQUFROztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQix5QkFBeUIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hcnRodXJyb3NjaC9EZXNrdG9wL0V4dHJlbWUtQ29udGluZy1uY2lhL25vZGVfbW9kdWxlcy8ucG5wbS9Ab3RwbGliK3BsdWdpbi1jcnlwdG9AMTIuMC4xL25vZGVfbW9kdWxlcy9Ab3RwbGliL3BsdWdpbi1jcnlwdG8vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAb3RwbGliL3BsdWdpbi1jcnlwdG9cbiAqXG4gKiBAYXV0aG9yIEdlcmFsZCBZZW8gPGNvbnRhY3RAZnVzZWR0aG91Z2h0LmNvbT5cbiAqIEB2ZXJzaW9uOiAxMi4wLjFcbiAqIEBsaWNlbnNlOiBNSVRcbiAqKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBjcnlwdG8gPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnY3J5cHRvJykpO1xuXG5jb25zdCBjcmVhdGVEaWdlc3QgPSAoYWxnb3JpdGhtLCBobWFjS2V5LCBjb3VudGVyKSA9PiB7XG4gIGNvbnN0IGhtYWMgPSBjcnlwdG8uY3JlYXRlSG1hYyhhbGdvcml0aG0sIEJ1ZmZlci5mcm9tKGhtYWNLZXksICdoZXgnKSk7XG4gIGNvbnN0IGRpZ2VzdCA9IGhtYWMudXBkYXRlKEJ1ZmZlci5mcm9tKGNvdW50ZXIsICdoZXgnKSkuZGlnZXN0KCk7XG4gIHJldHVybiBkaWdlc3QudG9TdHJpbmcoJ2hleCcpO1xufTtcbmNvbnN0IGNyZWF0ZVJhbmRvbUJ5dGVzID0gKHNpemUsIGVuY29kaW5nKSA9PiB7XG4gIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoc2l6ZSkudG9TdHJpbmcoZW5jb2RpbmcpO1xufTtcblxuZXhwb3J0cy5jcmVhdGVEaWdlc3QgPSBjcmVhdGVEaWdlc3Q7XG5leHBvcnRzLmNyZWF0ZVJhbmRvbUJ5dGVzID0gY3JlYXRlUmFuZG9tQnl0ZXM7XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@otplib+plugin-crypto@12.0.1/node_modules/@otplib/plugin-crypto/index.js\n");

/***/ })

};
;