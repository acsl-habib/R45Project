"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(userName, accessToken, refreshToken, expires, role) {
        this.userName = userName;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expires = expires;
        this.role = role;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map