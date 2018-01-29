"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const index_1 = require("./home/index");
const index_2 = require("./login/index");
const index_3 = require("./register/index");
const index_4 = require("./user/index");
const index_5 = require("./forgotpassword/index");
const auth_guard_1 = require("./_guards/auth.guard");
const index_6 = require("./admin/index");
const index_7 = require("./admin/index");
const index_8 = require("./admin/quesanswer/index");
const appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'user', component: index_4.UsersComponent },
    { path: 'forgotpassword', component: index_5.ForgotPasswordComponent },
    { path: 'agents', component: index_6.AgentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'history', component: index_7.HistoryComponent },
    { path: 'qa', component: index_8.QuesAnswerComponent },
    //{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    // { path: 'User', loadChildren: './user/user.module#UserModule' }
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map