"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const common_1 = require("@angular/common");
const ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
const ng2_charts_1 = require("ng2-charts");
//import { Chat } from 'botframework-webchat';
// used to create fake backend
const index_1 = require("./_helpers/index");
const testing_1 = require("@angular/http/testing");
const http_2 = require("@angular/http");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const index_2 = require("./_directives/index");
const index_3 = require("./_directives/index");
const index_4 = require("./_directives/index");
const index_5 = require("./_directives/index");
const index_6 = require("./_directives/index");
const auth_guard_1 = require("./_guards/auth.guard");
const index_7 = require("./_services/index");
const index_8 = require("./home/index");
const index_9 = require("./login/index");
const index_10 = require("./register/index");
const index_11 = require("./forgotpassword/index");
const index_12 = require("./admin/index");
const index_13 = require("./admin/index");
const index_14 = require("./admin/index");
const index_15 = require("./admin/index");
const index_16 = require("./admin/index");
const index_17 = require("./admin/index");
const index_18 = require("./admin/index");
const index_19 = require("./admin/index");
const index_20 = require("./admin/index");
const index_21 = require("./admin/index");
const index_22 = require("./admin/index");
const index_23 = require("./admin/index");
const index_24 = require("./admin/index");
const index_25 = require("./admin/index");
const index_26 = require("./admin/index");
const index_27 = require("./admin/index");
const index_28 = require("./admin/index");
const index_29 = require("./user/index");
const index_30 = require("./_filter/index");
const search_component_1 = require("./_shared/search.component");
const errorhandler_1 = require("./_shared/errorhandler");
const index_31 = require("./admin/quesanswer/index");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            ng2_bs3_modal_1.Ng2Bs3ModalModule,
            ng2_charts_1.ChartsModule //,
            //Chat
        ],
        declarations: [
            app_component_1.AppComponent,
            index_2.AlertComponent,
            index_3.AdminHeaderComponent,
            index_4.AdminFooterComponent,
            index_8.HomeComponent,
            index_9.LoginComponent,
            index_10.RegisterComponent,
            index_11.ForgotPasswordComponent,
            index_29.UsersComponent,
            index_30.UserFilterPipe,
            search_component_1.SearchComponent,
            index_6.LogoutComponent,
            index_31.QuesAnswerComponent,
            index_12.AdminComponent,
            index_13.AccountComponent,
            index_14.AgentComponent,
            index_15.AnalyticsComponent,
            index_16.BannedComponent,
            index_17.DepartmentComponent,
            index_18.GoalsComponent,
            index_19.HistoryComponent,
            index_20.PersonalComponent,
            index_21.RolesComponent,
            index_22.RoutingComponent,
            index_23.ShortcutsComponent,
            index_24.TriggersComponent,
            index_25.VisitorsComponent,
            index_26.WidgetComponent,
            index_27.MonitorComponent,
            index_5.ChartWindowComponent,
            index_28.AgentTestComponent
        ],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' },
            { provide: core_1.ErrorHandler, useClass: errorhandler_1.default },
            auth_guard_1.AuthGuard,
            index_7.AlertService,
            index_7.AuthenticationService,
            index_7.UserService,
            index_7.UsersService,
            index_7.QuesAnsService,
            index_7.PendingAssistantService,
            // providers used to create fake backend
            index_1.fakeBackendProvider,
            testing_1.MockBackend,
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map