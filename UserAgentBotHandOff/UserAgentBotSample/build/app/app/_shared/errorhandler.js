"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class AppErrorHandler extends core_1.ErrorHandler {
    constructor() {
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        super(true);
    }
    handleError(error) {
        debugger;
        alert(error);
        super.handleError(error);
    }
}
exports.default = AppErrorHandler;
//# sourceMappingURL=errorhandler.js.map