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
const index_8 = require("./admin/index");
const index_9 = require("./admin/index");
const index_10 = require("./admin/index");
const index_11 = require("./admin/index");
const index_12 = require("./admin/index");
const index_13 = require("./admin/index");
const index_14 = require("./admin/quesanswer/index");
const index_15 = require("./admin/index");
const index_16 = require("./admin/index");
const index_17 = require("./admin/index");
const index_18 = require("./admin/index");
const index_19 = require("./admin/index");
const index_20 = require("./admin/index");
const index_21 = require("./admin/index");
const index_22 = require("./admin/index");
const appRoutes = [
    { path: 'home', component: index_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'user', component: index_4.UsersComponent },
    { path: 'forgotpassword', component: index_5.ForgotPasswordComponent },
    // admin section
    //{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    //{ path: 'agents', component: AgentComponent, canActivate: [AuthGuard] },
    //{ path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
    //{ path: 'banned', component: BannedComponent, canActivate: [AuthGuard] },
    //{ path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
    //{ path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    //{ path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    //{ path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
    //{ path: 'qa', component: QuesAnswerComponent, canActivate: [AuthGuard] },
    //{ path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    //{ path: 'routing', component: RoutingComponent, canActivate: [AuthGuard] },
    //{ path: 'shortcuts', component: ShortcutsComponent, canActivate: [AuthGuard] },
    //{ path: 'triggers', component: TriggersComponent, canActivate: [AuthGuard] },
    //{ path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
    //{ path: 'widget', component: WidgetComponent, canActivate: [AuthGuard] },
    { path: 'account', component: index_6.AccountComponent },
    { path: 'agents', component: index_7.AgentComponent },
    { path: 'analytics', component: index_8.AnalyticsComponent },
    { path: 'banned', component: index_9.BannedComponent },
    { path: 'departments', component: index_10.DepartmentComponent },
    { path: 'goals', component: index_11.GoalsComponent },
    { path: 'history', component: index_12.HistoryComponent },
    { path: 'personal', component: index_13.PersonalComponent },
    { path: 'qa', component: index_14.QuesAnswerComponent },
    { path: 'roles', component: index_15.RolesComponent },
    { path: 'routing', component: index_16.RoutingComponent },
    { path: 'shortcuts', component: index_17.ShortcutsComponent },
    { path: 'triggers', component: index_18.TriggersComponent },
    { path: 'visitors', component: index_19.VisitorsComponent },
    { path: 'widget', component: index_20.WidgetComponent },
    { path: 'monitoring', component: index_21.MonitorComponent },
    { path: 'agenttest', component: index_22.AgentTestComponent },
    //{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    // { path: 'User', loadChildren: './user/user.module#UserModule' }
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, {
    useHash: true
});
//# sourceMappingURL=app.routing.js.map