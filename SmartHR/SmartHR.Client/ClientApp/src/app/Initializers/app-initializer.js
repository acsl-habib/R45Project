"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appInitializer = void 0;
var es6_promise_1 = require("es6-promise");
function appInitializer(authenticationService) {
    return function () { return new es6_promise_1.Promise(function (resolve) {
        // attempt to refresh token on app start up to auto authenticate
    }); };
}
exports.appInitializer = appInitializer;
//# sourceMappingURL=app-initializer.js.map