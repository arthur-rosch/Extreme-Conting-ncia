"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@otplib+plugin-thirty-two@12.0.1";
exports.ids = ["vendor-chunks/@otplib+plugin-thirty-two@12.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@otplib+plugin-thirty-two@12.0.1/node_modules/@otplib/plugin-thirty-two/index.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@otplib+plugin-thirty-two@12.0.1/node_modules/@otplib/plugin-thirty-two/index.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * @otplib/plugin-thirty-two\n *\n * @author Gerald Yeo <contact@fusedthought.com>\n * @version: 12.0.1\n * @license: MIT\n **/\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar thirtyTwo = _interopDefault(__webpack_require__(/*! thirty-two */ \"(ssr)/./node_modules/.pnpm/thirty-two@1.0.2/node_modules/thirty-two/lib/thirty-two/index.js\"));\n\nconst keyDecoder = (encodedSecret, encoding) => {\n  return thirtyTwo.decode(encodedSecret).toString(encoding);\n};\nconst keyEncoder = (secret, encoding) => {\n  return thirtyTwo.encode(Buffer.from(secret, encoding).toString('ascii')).toString().replace(/=/g, '');\n};\n\nexports.keyDecoder = keyDecoder;\nexports.keyEncoder = keyEncoder;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQG90cGxpYitwbHVnaW4tdGhpcnR5LXR3b0AxMi4wLjEvbm9kZV9tb2R1bGVzL0BvdHBsaWIvcGx1Z2luLXRoaXJ0eS10d28vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7O0FBRTdELGdDQUFnQzs7QUFFaEMsZ0NBQWdDLG1CQUFPLENBQUMsK0dBQVk7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEIsa0JBQWtCIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVycm9zY2gvRGVza3RvcC9FeHRyZW1lLUNvbnRpbmctbmNpYS9ub2RlX21vZHVsZXMvLnBucG0vQG90cGxpYitwbHVnaW4tdGhpcnR5LXR3b0AxMi4wLjEvbm9kZV9tb2R1bGVzL0BvdHBsaWIvcGx1Z2luLXRoaXJ0eS10d28vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAb3RwbGliL3BsdWdpbi10aGlydHktdHdvXG4gKlxuICogQGF1dGhvciBHZXJhbGQgWWVvIDxjb250YWN0QGZ1c2VkdGhvdWdodC5jb20+XG4gKiBAdmVyc2lvbjogMTIuMC4xXG4gKiBAbGljZW5zZTogTUlUXG4gKiovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgdGhpcnR5VHdvID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3RoaXJ0eS10d28nKSk7XG5cbmNvbnN0IGtleURlY29kZXIgPSAoZW5jb2RlZFNlY3JldCwgZW5jb2RpbmcpID0+IHtcbiAgcmV0dXJuIHRoaXJ0eVR3by5kZWNvZGUoZW5jb2RlZFNlY3JldCkudG9TdHJpbmcoZW5jb2RpbmcpO1xufTtcbmNvbnN0IGtleUVuY29kZXIgPSAoc2VjcmV0LCBlbmNvZGluZykgPT4ge1xuICByZXR1cm4gdGhpcnR5VHdvLmVuY29kZShCdWZmZXIuZnJvbShzZWNyZXQsIGVuY29kaW5nKS50b1N0cmluZygnYXNjaWknKSkudG9TdHJpbmcoKS5yZXBsYWNlKC89L2csICcnKTtcbn07XG5cbmV4cG9ydHMua2V5RGVjb2RlciA9IGtleURlY29kZXI7XG5leHBvcnRzLmtleUVuY29kZXIgPSBrZXlFbmNvZGVyO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@otplib+plugin-thirty-two@12.0.1/node_modules/@otplib/plugin-thirty-two/index.js\n");

/***/ })

};
;