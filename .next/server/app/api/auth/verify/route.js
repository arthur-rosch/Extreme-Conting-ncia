/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/verify/route";
exports.ids = ["app/api/auth/verify/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/verify/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/verify/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nasync function POST(request) {\n    try {\n        const authHeader = request.headers.get(\"authorization\");\n        if (!authHeader || !authHeader.startsWith(\"Bearer \")) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token não fornecido\"\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.substring(7) // Remove \"Bearer \"\n        ;\n        // Verificar token\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, process.env.JWT_SECRET || \"fallback-secret\");\n        if (!decoded.userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        // Verificar se o usuário ainda existe no banco\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n            where: {\n                id: decoded.userId\n            },\n            select: {\n                id: true,\n                email: true,\n                name: true,\n                role: true\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Usuário não encontrado\"\n            }, {\n                status: 401\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            valid: true,\n            user: {\n                id: user.id,\n                email: user.email,\n                name: user.name,\n                role: user.role\n            }\n        });\n    } catch (error) {\n        console.error(\"Erro na verificação do token:\", error);\n        if (error instanceof (jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().JsonWebTokenError)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token inválido\"\n            }, {\n                status: 401\n            });\n        }\n        if (error instanceof (jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().TokenExpiredError)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token expirado\"\n            }, {\n                status: 401\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro interno do servidor\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmVyaWZ5L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXVEO0FBQ3pCO0FBQ087QUFFOUIsZUFBZUcsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU1DLGFBQWFELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO1FBRXZDLElBQUksQ0FBQ0YsY0FBYyxDQUFDQSxXQUFXRyxVQUFVLENBQUMsWUFBWTtZQUNwRCxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFzQixHQUMvQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTUMsUUFBUVAsV0FBV1EsU0FBUyxDQUFDLEdBQUcsbUJBQW1COztRQUV6RCxrQkFBa0I7UUFDbEIsTUFBTUMsVUFBVWIsMERBQVUsQ0FBQ1csT0FBT0ksUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7UUFFNUQsSUFBSSxDQUFDSixRQUFRSyxNQUFNLEVBQUU7WUFDbkIsT0FBT25CLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWlCLEdBQzFCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSwrQ0FBK0M7UUFDL0MsTUFBTVMsT0FBTyxNQUFNbEIsK0NBQU1BLENBQUNrQixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRUMsSUFBSVQsUUFBUUssTUFBTTtZQUFDO1lBQzVCSyxRQUFRO2dCQUFFRCxJQUFJO2dCQUFNRSxPQUFPO2dCQUFNQyxNQUFNO2dCQUFNQyxNQUFNO1lBQUs7UUFDMUQ7UUFFQSxJQUFJLENBQUNQLE1BQU07WUFDVCxPQUFPcEIscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBeUIsR0FDbEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU9YLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJtQixPQUFPO1lBQ1BSLE1BQU07Z0JBQ0pHLElBQUlILEtBQUtHLEVBQUU7Z0JBQ1hFLE9BQU9MLEtBQUtLLEtBQUs7Z0JBQ2pCQyxNQUFNTixLQUFLTSxJQUFJO2dCQUNmQyxNQUFNUCxLQUFLTyxJQUFJO1lBQ2pCO1FBQ0Y7SUFDRixFQUFFLE9BQU9qQixPQUFPO1FBQ2RtQixRQUFRbkIsS0FBSyxDQUFDLGlDQUFpQ0E7UUFFL0MsSUFBSUEsaUJBQWlCVCx1RUFBcUIsRUFBRTtZQUMxQyxPQUFPRCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFpQixHQUMxQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUQsaUJBQWlCVCx1RUFBcUIsRUFBRTtZQUMxQyxPQUFPRCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFpQixHQUMxQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsT0FBT1gscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUEyQixHQUNwQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2FydGh1cnJvc2NoL0Rlc2t0b3AvRXh0cmVtZS1Db250aW5nLW5jaWEvYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxdWVzdC5oZWFkZXJzLmdldChcImF1dGhvcml6YXRpb25cIilcbiAgICBcbiAgICBpZiAoIWF1dGhIZWFkZXIgfHwgIWF1dGhIZWFkZXIuc3RhcnRzV2l0aChcIkJlYXJlciBcIikpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJUb2tlbiBuw6NvIGZvcm5lY2lkb1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlci5zdWJzdHJpbmcoNykgLy8gUmVtb3ZlIFwiQmVhcmVyIFwiXG4gICAgXG4gICAgLy8gVmVyaWZpY2FyIHRva2VuXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJmYWxsYmFjay1zZWNyZXRcIikgYXMgYW55XG4gICAgXG4gICAgaWYgKCFkZWNvZGVkLnVzZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGludsOhbGlkb1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFZlcmlmaWNhciBzZSBvIHVzdcOhcmlvIGFpbmRhIGV4aXN0ZSBubyBiYW5jb1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBkZWNvZGVkLnVzZXJJZCB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBlbWFpbDogdHJ1ZSwgbmFtZTogdHJ1ZSwgcm9sZTogdHJ1ZSB9XG4gICAgfSlcblxuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlVzdcOhcmlvIG7Do28gZW5jb250cmFkb1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIHJvbGU6IHVzZXIucm9sZVxuICAgICAgfVxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm8gbmEgdmVyaWZpY2HDp8OjbyBkbyB0b2tlbjpcIiwgZXJyb3IpXG4gICAgXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2Ygand0Lkpzb25XZWJUb2tlbkVycm9yKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiVG9rZW4gaW52w6FsaWRvXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApXG4gICAgfVxuICAgIFxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGp3dC5Ub2tlbkV4cGlyZWRFcnJvcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIlRva2VuIGV4cGlyYWRvXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJFcnJvIGludGVybm8gZG8gc2Vydmlkb3JcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKVxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJqd3QiLCJwcmlzbWEiLCJQT1NUIiwicmVxdWVzdCIsImF1dGhIZWFkZXIiLCJoZWFkZXJzIiwiZ2V0Iiwic3RhcnRzV2l0aCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInRva2VuIiwic3Vic3RyaW5nIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwidXNlcklkIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic2VsZWN0IiwiZW1haWwiLCJuYW1lIiwicm9sZSIsInZhbGlkIiwiY29uc29sZSIsIkpzb25XZWJUb2tlbkVycm9yIiwiVG9rZW5FeHBpcmVkRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/verify/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM2QjtBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLQyxLQUFzQyxHQUFHO1FBQUM7UUFBUztRQUFTO0tBQU8sR0FBRyxDQUFTO0FBQ3RGLEdBQUU7QUFFSixJQUFJQSxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hcnRodXJyb3NjaC9EZXNrdG9wL0V4dHJlbWUtQ29udGluZy1uY2lhL2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYT86IFByaXNtYUNsaWVudCB9XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbiAgfSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_arthurrosch_Desktop_Extreme_Conting_ncia_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/verify/route.ts */ \"(rsc)/./app/api/auth/verify/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/verify/route\",\n        pathname: \"/api/auth/verify\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/verify/route\"\n    },\n    resolvedPagePath: \"/Users/arthurrosch/Desktop/Extreme-Conting-ncia/app/api/auth/verify/route.ts\",\n    nextConfigOutput,\n    userland: _Users_arthurrosch_Desktop_Extreme_Conting_ncia_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMV9yZWFjdEAxOS4xLjFfX3JlYWN0QDE5LjEuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnZlcmlmeSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFydGh1cnJvc2NoJTJGRGVza3RvcCUyRkV4dHJlbWUtQ29udGluZy1uY2lhJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmFydGh1cnJvc2NoJTJGRGVza3RvcCUyRkV4dHJlbWUtQ29udGluZy1uY2lhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FydGh1cnJvc2NoL0Rlc2t0b3AvRXh0cmVtZS1Db250aW5nLW5jaWEvYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3ZlcmlmeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvYXJ0aHVycm9zY2gvRGVza3RvcC9FeHRyZW1lLUNvbnRpbmctbmNpYS9hcHAvYXBpL2F1dGgvdmVyaWZ5L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1","vendor-chunks/semver@7.7.2","vendor-chunks/jsonwebtoken@9.0.2","vendor-chunks/lodash.includes@4.3.0","vendor-chunks/jws@3.2.2","vendor-chunks/lodash.once@4.1.1","vendor-chunks/jwa@1.4.2","vendor-chunks/lodash.isinteger@4.0.4","vendor-chunks/ecdsa-sig-formatter@1.0.11","vendor-chunks/lodash.isplainobject@4.0.6","vendor-chunks/ms@2.1.3","vendor-chunks/lodash.isstring@4.0.1","vendor-chunks/lodash.isnumber@3.0.3","vendor-chunks/lodash.isboolean@3.0.3","vendor-chunks/safe-buffer@5.2.1","vendor-chunks/buffer-equal-constant-time@1.0.1"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme-Conting-ncia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();