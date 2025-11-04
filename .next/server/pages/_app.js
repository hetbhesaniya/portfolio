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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./Components/ThemeProvider.js":
/*!*************************************!*\
  !*** ./Components/ThemeProvider.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    theme: \"asu-light\",\n    toggleTheme: ()=>{}\n});\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"asu-light\");\n    // Load saved theme\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const saved =  false ? 0 : null;\n        if (saved === \"asu-dark\" || saved === \"asu-light\") {\n            setTheme(saved);\n        }\n    }, []);\n    // Apply theme to <html> attribute for CSS variables\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (typeof document !== \"undefined\") {\n            document.documentElement.setAttribute(\"data-theme\", theme);\n            localStorage.setItem(\"theme\", theme);\n        }\n    }, [\n        theme\n    ]);\n    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({\n            theme,\n            toggleTheme: ()=>setTheme((t)=>t === \"asu-dark\" ? \"asu-light\" : \"asu-dark\")\n        }), [\n        theme\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/Components/ThemeProvider.js\",\n        lineNumber: 30,\n        columnNumber: 9\n    }, this);\n}\nfunction useTheme() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL1RoZW1lUHJvdmlkZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFnRjtBQUVoRixNQUFNSyw2QkFBZUwsb0RBQWFBLENBQUM7SUFBRU0sT0FBTztJQUFhQyxhQUFhLEtBQU87QUFBRTtBQUV4RSxTQUFTQyxjQUFjLEVBQUVDLFFBQVEsRUFBRTtJQUN0QyxNQUFNLENBQUNILE9BQU9JLFNBQVMsR0FBR04sK0NBQVFBLENBQUM7SUFFbkMsbUJBQW1CO0lBQ25CRixnREFBU0EsQ0FBQztRQUNOLE1BQU1TLFFBQVEsTUFBNkIsR0FBR0MsQ0FBNkIsR0FBRztRQUM5RSxJQUFJRCxVQUFVLGNBQWNBLFVBQVUsYUFBYTtZQUMvQ0QsU0FBU0M7UUFDYjtJQUNKLEdBQUcsRUFBRTtJQUVMLG9EQUFvRDtJQUNwRFQsZ0RBQVNBLENBQUM7UUFDTixJQUFJLE9BQU9ZLGFBQWEsYUFBYTtZQUNqQ0EsU0FBU0MsZUFBZSxDQUFDQyxZQUFZLENBQUMsY0FBY1Y7WUFDcERNLGFBQWFLLE9BQU8sQ0FBQyxTQUFTWDtRQUNsQztJQUNKLEdBQUc7UUFBQ0E7S0FBTTtJQUVWLE1BQU1ZLFFBQVFmLDhDQUFPQSxDQUFDLElBQU87WUFDekJHO1lBQ0FDLGFBQWEsSUFBTUcsU0FBUyxDQUFDUyxJQUFPQSxNQUFNLGFBQWEsY0FBYztRQUN6RSxJQUFJO1FBQUNiO0tBQU07SUFFWCxxQkFDSSw4REFBQ0QsYUFBYWUsUUFBUTtRQUFDRixPQUFPQTtrQkFBUVQ7Ozs7OztBQUU5QztBQUVPLFNBQVNZO0lBQ1osT0FBT3BCLGlEQUFVQSxDQUFDSTtBQUN0QiIsInNvdXJjZXMiOlsid2VicGFjazovL3BvcnRmb2xpby8uL0NvbXBvbmVudHMvVGhlbWVQcm92aWRlci5qcz83ZjQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVGhlbWVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7IHRoZW1lOiBcImFzdS1saWdodFwiLCB0b2dnbGVUaGVtZTogKCkgPT4ge30gfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVtZVByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICAgIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGUoXCJhc3UtbGlnaHRcIik7XG5cbiAgICAvLyBMb2FkIHNhdmVkIHRoZW1lXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWQgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aGVtZVwiKSA6IG51bGw7XG4gICAgICAgIGlmIChzYXZlZCA9PT0gXCJhc3UtZGFya1wiIHx8IHNhdmVkID09PSBcImFzdS1saWdodFwiKSB7XG4gICAgICAgICAgICBzZXRUaGVtZShzYXZlZCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICAvLyBBcHBseSB0aGVtZSB0byA8aHRtbD4gYXR0cmlidXRlIGZvciBDU1MgdmFyaWFibGVzXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIiwgdGhlbWUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aGVtZVwiLCB0aGVtZSk7XG4gICAgICAgIH1cbiAgICB9LCBbdGhlbWVdKTtcblxuICAgIGNvbnN0IHZhbHVlID0gdXNlTWVtbygoKSA9PiAoe1xuICAgICAgICB0aGVtZSxcbiAgICAgICAgdG9nZ2xlVGhlbWU6ICgpID0+IHNldFRoZW1lKCh0KSA9PiAodCA9PT0gXCJhc3UtZGFya1wiID8gXCJhc3UtbGlnaHRcIiA6IFwiYXN1LWRhcmtcIikpLFxuICAgIH0pLCBbdGhlbWVdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9UaGVtZUNvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRoZW1lKCkge1xuICAgIHJldHVybiB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlU3RhdGUiLCJUaGVtZUNvbnRleHQiLCJ0aGVtZSIsInRvZ2dsZVRoZW1lIiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwic2V0VGhlbWUiLCJzYXZlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInNldEl0ZW0iLCJ2YWx1ZSIsInQiLCJQcm92aWRlciIsInVzZVRoZW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/ThemeProvider.js\n");

/***/ }),

/***/ "./Layout.js":
/*!*******************!*\
  !*** ./Layout.js ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);\nframer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nfunction Layout({ children }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen relative\",\n        style: {\n            background: \"var(--asu-ink)\",\n            color: \"var(--asu-text)\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {\n            initial: {\n                opacity: 0\n            },\n            animate: {\n                opacity: 1\n            },\n            transition: {\n                duration: 0.8\n            },\n            className: \"relative noise-bg\",\n            children: children\n        }, void 0, false, {\n            fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/Layout.js\",\n            lineNumber: 6,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/Layout.js\",\n        lineNumber: 5,\n        columnNumber: 9\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9MYXlvdXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBdUM7QUFFeEIsU0FBU0MsT0FBTyxFQUFFQyxRQUFRLEVBQUU7SUFDdkMscUJBQ0ksOERBQUNDO1FBQUlDLFdBQVU7UUFBd0JDLE9BQU87WUFBRUMsWUFBWTtZQUFrQkMsT0FBTztRQUFrQjtrQkFDbkcsNEVBQUNQLGlEQUFNQSxDQUFDRyxHQUFHO1lBQ1BLLFNBQVM7Z0JBQUVDLFNBQVM7WUFBRTtZQUN0QkMsU0FBUztnQkFBRUQsU0FBUztZQUFFO1lBQ3RCRSxZQUFZO2dCQUFFQyxVQUFVO1lBQUk7WUFDNUJSLFdBQVU7c0JBRVRGOzs7Ozs7Ozs7OztBQUlqQiIsInNvdXJjZXMiOlsid2VicGFjazovL3BvcnRmb2xpby8uL0xheW91dC5qcz80MmQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheW91dCh7IGNoaWxkcmVuIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiByZWxhdGl2ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1hc3UtaW5rKScsIGNvbG9yOiAndmFyKC0tYXN1LXRleHQpJyB9fT5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuOCB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG5vaXNlLWJnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59Il0sIm5hbWVzIjpbIm1vdGlvbiIsIkxheW91dCIsImNoaWxkcmVuIiwiZGl2IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJpbml0aWFsIiwib3BhY2l0eSIsImFuaW1hdGUiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Layout.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layout */ \"./Layout.js\");\n/* harmony import */ var _Components_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/ThemeProvider */ \"./Components/ThemeProvider.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Layout__WEBPACK_IMPORTED_MODULE_2__]);\n_Layout__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/pages/_app.js\",\n            lineNumber: 8,\n            columnNumber: 5\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hetbhesaniya/Desktop/Projects/ASU Portfolio/pages/_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ0E7QUFDNkI7QUFFNUMsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRSw4REFBQ0gsb0VBQWFBO2tCQUNkLDRFQUFDRCwrQ0FBTUE7c0JBQ0wsNEVBQUNHO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3J0Zm9saW8vLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiQC9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcIkAvTGF5b3V0XCI7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIkAvQ29tcG9uZW50cy9UaGVtZVByb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlcj5cbiAgICA8TGF5b3V0PlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvTGF5b3V0PlxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJMYXlvdXQiLCJUaGVtZVByb3ZpZGVyIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();