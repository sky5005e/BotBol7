"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const index_1 = require("./home/index");
const index_2 = require("./login/index");
const index_3 = require("./register/index");
const index_4 = require("./user/index");
const index_5 = require("./forgotpassword/index");
const auth_guard_1 = require("./_guards/auth.guard");
const index_6 = require("./admin/quesanswer/index");
const index_7 = require("./admin/index");
const index_8 = require("./privacy/index");
const index_9 = require("./terms/index");
const appRoutes = [
    { path: 'home', component: index_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'user', component: index_4.UsersComponent },
    { path: 'forgotpassword', component: index_5.ForgotPasswordComponent },
    // admin section
    { path: 'account', component: index_7.AccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agents', component: index_7.AgentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'analytics', component: index_7.AnalyticsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'banned', component: index_7.BannedComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department', component: index_7.DepartmentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'goals', component: index_7.GoalsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'history', component: index_7.HistoryComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'personal', component: index_7.PersonalComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'qa', component: index_6.QuesAnswerComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'roles', component: index_7.RolesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'routing', component: index_7.RoutingComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'shortcuts', component: index_7.ShortcutsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'triggers', component: index_7.TriggersComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'visitors', component: index_7.VisitorsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'widget', component: index_7.WidgetComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'monitoring', component: index_7.MonitorComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'agentchat', component: index_7.AgentChatComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'privacy', component: index_8.PrivacyComponent },
    { path: 'terms', component: index_9.TermsComponent },
    //{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    //{ path: 'User', loadChildren: './user/user.module#UserModule' }
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, {
    useHash: true
});
//# sourceMappingURL=app.routing.js.map