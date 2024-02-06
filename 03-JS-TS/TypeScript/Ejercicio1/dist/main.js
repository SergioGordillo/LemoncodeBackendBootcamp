/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

eval("var books = [{\n  title: \"Harry Potter and the Philosopher's Stone\",\n  isRead: true\n}, {\n  title: \"Harry Potter and the Chamber of Secrets\",\n  isRead: false\n}, {\n  title: \"Harry Potter and the Prisoner of Azkaban\",\n  isRead: true\n}];\n\nfunction isBookRead(books, titleToSearch) {\n  var bookByTitle = books.find(function (book) {\n    return book.title === titleToSearch;\n  });\n  return Boolean(bookByTitle) && bookByTitle.isRead;\n}\n\nconsole.log(isBookRead(books, \"The end of the times\"));\nconsole.log(isBookRead(books, \"Harry Potter and the Chamber of Secrets\"));\nconsole.log(isBookRead(books, \"Harry Potter and the Prisoner of Azkaban\"));\n\n//# sourceURL=webpack://04-readbook/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./main.js"]();
/******/ 	
/******/ })()
;