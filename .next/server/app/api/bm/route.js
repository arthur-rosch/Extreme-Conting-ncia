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
exports.id = "app/api/bm/route";
exports.ids = ["app/api/bm/route"];
exports.modules = {

/***/ "(rsc)/./app/api/bm/route.ts":
/*!*****************************!*\
  !*** ./app/api/bm/route.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_jsondb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/jsondb */ \"(rsc)/./lib/jsondb.ts\");\n/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/types */ \"(rsc)/./lib/types.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"(rsc)/./node_modules/.pnpm/uuid@11.1.0/node_modules/uuid/dist/esm/v4.js\");\n\n\n\n\nasync function GET() {\n    try {\n        const accounts = await (0,_lib_jsondb__WEBPACK_IMPORTED_MODULE_1__.readBM)();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(accounts);\n    } catch (error) {\n        console.error('Error in GET /api/bm:', error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            message: 'Failed to fetch BM accounts'\n        }), {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { saleStatus, ...restOfBody } = body;\n        const newAccountData = _lib_types__WEBPACK_IMPORTED_MODULE_2__.BMAccountSchema.omit({\n            id: true,\n            createdAt: true,\n            updatedAt: true,\n            hash: true\n        }).parse(restOfBody);\n        const accounts = await (0,_lib_jsondb__WEBPACK_IMPORTED_MODULE_1__.readBM)();\n        const newAccount = {\n            id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(),\n            ...newAccountData,\n            createdAt: new Date().toISOString(),\n            updatedAt: new Date().toISOString(),\n            hash: (0,uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(),\n            saleStatus\n        };\n        accounts.push(newAccount);\n        await (0,_lib_jsondb__WEBPACK_IMPORTED_MODULE_1__.writeBM)(accounts);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify(newAccount), {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Error in POST /api/bm:', error);\n        if (error instanceof Error) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n                message: 'Invalid data',\n                error: error.message\n            }), {\n                status: 400\n            });\n        }\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            message: 'Failed to create BM account'\n        }), {\n            status: 500\n        });\n    }\n}\nconst dynamic = \"force-dynamic\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2JtL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMkM7QUFDSTtBQUNEO0FBQ1Y7QUFFN0IsZUFBZU07SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTU4sbURBQU1BO1FBQzdCLE9BQU9ELHFEQUFZQSxDQUFDUSxJQUFJLENBQUNEO0lBQzNCLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPLElBQUlULHFEQUFZQSxDQUFDVyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsU0FBUztRQUE4QixJQUFJO1lBQUVDLFFBQVE7UUFBSTtJQUNwRztBQUNGO0FBRU8sZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUVIsSUFBSTtRQUMvQixNQUFNLEVBQUVVLFVBQVUsRUFBRSxHQUFHQyxZQUFZLEdBQUdGO1FBQ3RDLE1BQU1HLGlCQUFpQmpCLHVEQUFlQSxDQUFDa0IsSUFBSSxDQUFDO1lBQUVDLElBQUk7WUFBTUMsV0FBVztZQUFNQyxXQUFXO1lBQU1DLE1BQU07UUFBSyxHQUFHQyxLQUFLLENBQUNQO1FBRTlHLE1BQU1aLFdBQVcsTUFBTU4sbURBQU1BO1FBQzdCLE1BQU0wQixhQUFhO1lBQ2pCTCxJQUFJakIsZ0RBQU1BO1lBQ1YsR0FBR2UsY0FBYztZQUNqQkcsV0FBVyxJQUFJSyxPQUFPQyxXQUFXO1lBQ2pDTCxXQUFXLElBQUlJLE9BQU9DLFdBQVc7WUFDakNKLE1BQU1wQixnREFBTUE7WUFDWmE7UUFDRjtRQUNBWCxTQUFTdUIsSUFBSSxDQUFDSDtRQUNkLE1BQU16QixvREFBT0EsQ0FBQ0s7UUFFZCxPQUFPLElBQUlQLHFEQUFZQSxDQUFDVyxLQUFLQyxTQUFTLENBQUNlLGFBQWE7WUFBRWIsUUFBUTtRQUFJO0lBQ3BFLEVBQUUsT0FBT0wsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxJQUFJQSxpQkFBaUJzQixPQUFPO1lBQzFCLE9BQU8sSUFBSS9CLHFEQUFZQSxDQUFDVyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLFNBQVM7Z0JBQWdCSixPQUFPQSxNQUFNSSxPQUFPO1lBQUMsSUFBSTtnQkFBRUMsUUFBUTtZQUFJO1FBQzNHO1FBQ0EsT0FBTyxJQUFJZCxxREFBWUEsQ0FBQ1csS0FBS0MsU0FBUyxDQUFDO1lBQUVDLFNBQVM7UUFBOEIsSUFBSTtZQUFFQyxRQUFRO1FBQUk7SUFDcEc7QUFDRjtBQUVPLE1BQU1rQixVQUFVLGdCQUFnQiIsInNvdXJjZXMiOlsiL1VzZXJzL2FydGh1cnJvc2NoL0Rlc2t0b3AvRXh0cmVtZSBDb250aW5nZcyCbmNpYSBXZWJzaXRlICgxKS9hcHAvYXBpL2JtL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHJlYWRCTSwgd3JpdGVCTSB9IGZyb20gJ0AvbGliL2pzb25kYic7XG5pbXBvcnQgeyBCTUFjY291bnRTY2hlbWEgfSBmcm9tICdAL2xpYi90eXBlcyc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHJlYWRCTSgpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhY2NvdW50cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gR0VUIC9hcGkvYm06JywgZXJyb3IpO1xuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0ZhaWxlZCB0byBmZXRjaCBCTSBhY2NvdW50cycgfSksIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB7IHNhbGVTdGF0dXMsIC4uLnJlc3RPZkJvZHkgfSA9IGJvZHk7XG4gICAgY29uc3QgbmV3QWNjb3VudERhdGEgPSBCTUFjY291bnRTY2hlbWEub21pdCh7IGlkOiB0cnVlLCBjcmVhdGVkQXQ6IHRydWUsIHVwZGF0ZWRBdDogdHJ1ZSwgaGFzaDogdHJ1ZSB9KS5wYXJzZShyZXN0T2ZCb2R5KTtcblxuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgcmVhZEJNKCk7XG4gICAgY29uc3QgbmV3QWNjb3VudCA9IHtcbiAgICAgIGlkOiB1dWlkdjQoKSxcbiAgICAgIC4uLm5ld0FjY291bnREYXRhLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIGhhc2g6IHV1aWR2NCgpLFxuICAgICAgc2FsZVN0YXR1cyxcbiAgICB9O1xuICAgIGFjY291bnRzLnB1c2gobmV3QWNjb3VudCk7XG4gICAgYXdhaXQgd3JpdGVCTShhY2NvdW50cyk7XG5cbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShKU09OLnN0cmluZ2lmeShuZXdBY2NvdW50KSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBQT1NUIC9hcGkvYm06JywgZXJyb3IpO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdJbnZhbGlkIGRhdGEnLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnRmFpbGVkIHRvIGNyZWF0ZSBCTSBhY2NvdW50JyB9KSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiOyJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJyZWFkQk0iLCJ3cml0ZUJNIiwiQk1BY2NvdW50U2NoZW1hIiwidjQiLCJ1dWlkdjQiLCJHRVQiLCJhY2NvdW50cyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJKU09OIiwic3RyaW5naWZ5IiwibWVzc2FnZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsInNhbGVTdGF0dXMiLCJyZXN0T2ZCb2R5IiwibmV3QWNjb3VudERhdGEiLCJvbWl0IiwiaWQiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJoYXNoIiwicGFyc2UiLCJuZXdBY2NvdW50IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwicHVzaCIsIkVycm9yIiwiZHluYW1pYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bm/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/jsondb.ts":
/*!***********************!*\
  !*** ./lib/jsondb.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   readBM: () => (/* binding */ readBM),\n/* harmony export */   writeBM: () => (/* binding */ writeBM)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"(rsc)/./lib/types.ts\");\n\n\n\n\nconst DATA_FILE_PATH = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'data', 'bm.json');\nasync function readBM() {\n    try {\n        const fileContent = await fs__WEBPACK_IMPORTED_MODULE_0__.promises.readFile(DATA_FILE_PATH, 'utf-8');\n        const data = JSON.parse(fileContent);\n        return zod__WEBPACK_IMPORTED_MODULE_3__.array(_types__WEBPACK_IMPORTED_MODULE_2__.BMAccountSchema).parse(data);\n    } catch (error) {\n        if (error.code === 'ENOENT') {\n            console.warn('bm.json not found, returning empty array.');\n            return [];\n        }\n        console.error('Error reading bm.json:', error);\n        throw error;\n    }\n}\nasync function writeBM(data) {\n    try {\n        await fs__WEBPACK_IMPORTED_MODULE_0__.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');\n    } catch (error) {\n        console.error('Error writing to bm.json:', error);\n        throw error;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvanNvbmRiLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ1o7QUFDQTtBQUNrQjtBQUcxQyxNQUFNSyxpQkFBaUJILGdEQUFTLENBQUNLLFFBQVFDLEdBQUcsSUFBSSxRQUFRO0FBRWpELGVBQWVDO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxjQUFjLE1BQU1ULHdDQUFFQSxDQUFDVSxRQUFRLENBQUNOLGdCQUFnQjtRQUN0RCxNQUFNTyxPQUFPQyxLQUFLQyxLQUFLLENBQUNKO1FBQ3hCLE9BQU9QLHNDQUFPLENBQUNDLG1EQUFlQSxFQUFFVSxLQUFLLENBQUNGO0lBQ3hDLEVBQUUsT0FBT0ksT0FBWTtRQUNuQixJQUFJQSxNQUFNQyxJQUFJLEtBQUssVUFBVTtZQUMzQkMsUUFBUUMsSUFBSSxDQUFDO1lBQ2IsT0FBTyxFQUFFO1FBQ1g7UUFDQUQsUUFBUUYsS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsTUFBTUE7SUFDUjtBQUNGO0FBRU8sZUFBZUksUUFBUVIsSUFBaUI7SUFDN0MsSUFBSTtRQUNGLE1BQU1YLHdDQUFFQSxDQUFDb0IsU0FBUyxDQUFDaEIsZ0JBQWdCUSxLQUFLUyxTQUFTLENBQUNWLE1BQU0sTUFBTSxJQUFJO0lBQ3BFLEVBQUUsT0FBT0ksT0FBTztRQUNkRSxRQUFRRixLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxNQUFNQTtJQUNSO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hcnRodXJyb3NjaC9EZXNrdG9wL0V4dHJlbWUgQ29udGluZ2XMgm5jaWEgV2Vic2l0ZSAoMSkvbGliL2pzb25kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBCTUFjY291bnRTY2hlbWEgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEJNQWNjb3VudCB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBEQVRBX0ZJTEVfUEFUSCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZGF0YScsICdibS5qc29uJyk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkQk0oKTogUHJvbWlzZTxCTUFjY291bnRbXT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGZpbGVDb250ZW50ID0gYXdhaXQgZnMucmVhZEZpbGUoREFUQV9GSUxFX1BBVEgsICd1dGYtOCcpO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGZpbGVDb250ZW50KTtcbiAgICByZXR1cm4gei5hcnJheShCTUFjY291bnRTY2hlbWEpLnBhcnNlKGRhdGEpO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2JtLmpzb24gbm90IGZvdW5kLCByZXR1cm5pbmcgZW1wdHkgYXJyYXkuJyk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlYWRpbmcgYm0uanNvbjonLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlQk0oZGF0YTogQk1BY2NvdW50W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoREFUQV9GSUxFX1BBVEgsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpLCAndXRmLTgnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIGJtLmpzb246JywgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59Il0sIm5hbWVzIjpbInByb21pc2VzIiwiZnMiLCJwYXRoIiwieiIsIkJNQWNjb3VudFNjaGVtYSIsIkRBVEFfRklMRV9QQVRIIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJyZWFkQk0iLCJmaWxlQ29udGVudCIsInJlYWRGaWxlIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImFycmF5IiwiZXJyb3IiLCJjb2RlIiwiY29uc29sZSIsIndhcm4iLCJ3cml0ZUJNIiwid3JpdGVGaWxlIiwic3RyaW5naWZ5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/jsondb.ts\n");

/***/ }),

/***/ "(rsc)/./lib/types.ts":
/*!**********************!*\
  !*** ./lib/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BMAccountSchema: () => (/* binding */ BMAccountSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js\");\n\nconst bmStatusSchema = zod__WEBPACK_IMPORTED_MODULE_0__[\"enum\"]([\n    \"1-10k\",\n    \"10k-30k\",\n    \"30k-70k\",\n    \"70k-100k\",\n    \"100k-500k\",\n    \"500k+\"\n]);\nconst bmTypeSchema = zod__WEBPACK_IMPORTED_MODULE_0__[\"enum\"]([\n    \"meta\",\n    \"google\"\n]);\nconst bmSaleStatusSchema = zod__WEBPACK_IMPORTED_MODULE_0__[\"enum\"]([\n    \"available\",\n    \"sold\"\n]);\nconst BMAccountSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    id: zod__WEBPACK_IMPORTED_MODULE_0__.string().uuid(),\n    title: zod__WEBPACK_IMPORTED_MODULE_0__.string(),\n    description: zod__WEBPACK_IMPORTED_MODULE_0__.string(),\n    priceBRL: zod__WEBPACK_IMPORTED_MODULE_0__.number(),\n    limitBRL: zod__WEBPACK_IMPORTED_MODULE_0__.number(),\n    status: bmStatusSchema,\n    type: bmTypeSchema,\n    platform: zod__WEBPACK_IMPORTED_MODULE_0__[\"enum\"]([\n        'google',\n        'meta'\n    ]).default('meta'),\n    saleStatus: bmSaleStatusSchema.default('available'),\n    createdAt: zod__WEBPACK_IMPORTED_MODULE_0__.string().datetime(),\n    updatedAt: zod__WEBPACK_IMPORTED_MODULE_0__.string().datetime(),\n    hash: zod__WEBPACK_IMPORTED_MODULE_0__.string().optional()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdHlwZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0I7QUFFeEIsTUFBTUMsaUJBQWlCRCx3Q0FBTSxDQUFDO0lBQUM7SUFBUztJQUFXO0lBQVc7SUFBWTtJQUFhO0NBQVE7QUFDL0YsTUFBTUcsZUFBZUgsd0NBQU0sQ0FBQztJQUFDO0lBQVE7Q0FBUztBQUM5QyxNQUFNSSxxQkFBcUJKLHdDQUFNLENBQUM7SUFBQztJQUFhO0NBQU87QUFFaEQsTUFBTUssa0JBQWtCTCx1Q0FBUSxDQUFDO0lBQ3RDTyxJQUFJUCx1Q0FBUSxHQUFHUyxJQUFJO0lBQ25CQyxPQUFPVix1Q0FBUTtJQUNmVyxhQUFhWCx1Q0FBUTtJQUNyQlksVUFBVVosdUNBQVE7SUFDbEJjLFVBQVVkLHVDQUFRO0lBQ2xCZSxRQUFRZDtJQUNSZSxNQUFNYjtJQUNOYyxVQUFVakIsd0NBQU0sQ0FBQztRQUFDO1FBQVU7S0FBTyxFQUFFa0IsT0FBTyxDQUFDO0lBQzdDQyxZQUFZZixtQkFBbUJjLE9BQU8sQ0FBQztJQUN2Q0UsV0FBV3BCLHVDQUFRLEdBQUdxQixRQUFRO0lBQzlCQyxXQUFXdEIsdUNBQVEsR0FBR3FCLFFBQVE7SUFDOUJFLE1BQU12Qix1Q0FBUSxHQUFHd0IsUUFBUTtBQUMzQixHQUFHIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVycm9zY2gvRGVza3RvcC9FeHRyZW1lIENvbnRpbmdlzIJuY2lhIFdlYnNpdGUgKDEpL2xpYi90eXBlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuY29uc3QgYm1TdGF0dXNTY2hlbWEgPSB6LmVudW0oW1wiMS0xMGtcIiwgXCIxMGstMzBrXCIsIFwiMzBrLTcwa1wiLCBcIjcway0xMDBrXCIsIFwiMTAway01MDBrXCIsIFwiNTAwaytcIl0pO1xuY29uc3QgYm1UeXBlU2NoZW1hID0gei5lbnVtKFtcIm1ldGFcIiwgXCJnb29nbGVcIl0pO1xuY29uc3QgYm1TYWxlU3RhdHVzU2NoZW1hID0gei5lbnVtKFtcImF2YWlsYWJsZVwiLCBcInNvbGRcIl0pO1xuXG5leHBvcnQgY29uc3QgQk1BY2NvdW50U2NoZW1hID0gei5vYmplY3Qoe1xuICBpZDogei5zdHJpbmcoKS51dWlkKCksXG4gIHRpdGxlOiB6LnN0cmluZygpLFxuICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKSxcbiAgcHJpY2VCUkw6IHoubnVtYmVyKCksXG4gIGxpbWl0QlJMOiB6Lm51bWJlcigpLFxuICBzdGF0dXM6IGJtU3RhdHVzU2NoZW1hLFxuICB0eXBlOiBibVR5cGVTY2hlbWEsXG4gIHBsYXRmb3JtOiB6LmVudW0oWydnb29nbGUnLCAnbWV0YSddKS5kZWZhdWx0KCdtZXRhJyksXG4gIHNhbGVTdGF0dXM6IGJtU2FsZVN0YXR1c1NjaGVtYS5kZWZhdWx0KCdhdmFpbGFibGUnKSxcbiAgY3JlYXRlZEF0OiB6LnN0cmluZygpLmRhdGV0aW1lKCksXG4gIHVwZGF0ZWRBdDogei5zdHJpbmcoKS5kYXRldGltZSgpLFxuICBoYXNoOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KTtcblxuZXhwb3J0IHR5cGUgQk1BY2NvdW50ID0gei5pbmZlcjx0eXBlb2YgQk1BY2NvdW50U2NoZW1hPjsiXSwibmFtZXMiOlsieiIsImJtU3RhdHVzU2NoZW1hIiwiZW51bSIsImJtVHlwZVNjaGVtYSIsImJtU2FsZVN0YXR1c1NjaGVtYSIsIkJNQWNjb3VudFNjaGVtYSIsIm9iamVjdCIsImlkIiwic3RyaW5nIiwidXVpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwcmljZUJSTCIsIm51bWJlciIsImxpbWl0QlJMIiwic3RhdHVzIiwidHlwZSIsInBsYXRmb3JtIiwiZGVmYXVsdCIsInNhbGVTdGF0dXMiLCJjcmVhdGVkQXQiLCJkYXRldGltZSIsInVwZGF0ZWRBdCIsImhhc2giLCJvcHRpb25hbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/types.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbm%2Froute&page=%2Fapi%2Fbm%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbm%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbm%2Froute&page=%2Fapi%2Fbm%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbm%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_arthurrosch_Desktop_Extreme_Continge_ncia_Website_1_app_api_bm_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/bm/route.ts */ \"(rsc)/./app/api/bm/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/bm/route\",\n        pathname: \"/api/bm\",\n        filename: \"route\",\n        bundlePath: \"app/api/bm/route\"\n    },\n    resolvedPagePath: \"/Users/arthurrosch/Desktop/Extreme Contingência Website (1)/app/api/bm/route.ts\",\n    nextConfigOutput,\n    userland: _Users_arthurrosch_Desktop_Extreme_Continge_ncia_Website_1_app_api_bm_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMV9yZWFjdEAxOS4xLjFfX3JlYWN0QDE5LjEuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZibSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYm0lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZibSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFydGh1cnJvc2NoJTJGRGVza3RvcCUyRkV4dHJlbWUlMjBDb250aW5nZSVDQyU4Mm5jaWElMjBXZWJzaXRlJTIwKDEpJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmFydGh1cnJvc2NoJTJGRGVza3RvcCUyRkV4dHJlbWUlMjBDb250aW5nZSVDQyU4Mm5jaWElMjBXZWJzaXRlJTIwKDEpJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnQztBQUM3RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FydGh1cnJvc2NoL0Rlc2t0b3AvRXh0cmVtZSBDb250aW5nZcyCbmNpYSBXZWJzaXRlICgxKS9hcHAvYXBpL2JtL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9ibS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2JtXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9ibS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hcnRodXJyb3NjaC9EZXNrdG9wL0V4dHJlbWUgQ29udGluZ2XMgm5jaWEgV2Vic2l0ZSAoMSkvYXBwL2FwaS9ibS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbm%2Froute&page=%2Fapi%2Fbm%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbm%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1","vendor-chunks/zod@3.25.76","vendor-chunks/uuid@11.1.0"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbm%2Froute&page=%2Fapi%2Fbm%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbm%2Froute.ts&appDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Farthurrosch%2FDesktop%2FExtreme%20Continge%CC%82ncia%20Website%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();