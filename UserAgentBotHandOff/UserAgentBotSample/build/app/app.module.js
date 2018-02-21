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
const auth_guard_1 = require("./_guards/auth.guard");
const index_3 = require("./_services/index");
const fileupload_component_1 = require("./_directives/fileupload.component");
const index_4 = require("./home/index");
const index_5 = require("./login/index");
const index_6 = require("./register/index");
const index_7 = require("./forgotpassword/index");
const index_8 = require("./admin/index");
const index_9 = require("./user/index");
const index_10 = require("./_filter/index");
const search_component_1 = require("./_shared/search.component");
const errorhandler_1 = require("./_shared/errorhandler");
const index_11 = require("./admin/quesanswer/index");
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
            index_2.AdminHeaderComponent,
            index_2.AdminFooterComponent,
            index_4.HomeComponent,
            index_5.LoginComponent,
            index_6.RegisterComponent,
            index_7.ForgotPasswordComponent,
            index_9.UsersComponent,
            index_10.UserFilterPipe,
            search_component_1.SearchComponent,
            index_2.LogoutComponent,
            index_11.QuesAnswerComponent,
            index_8.AdminComponent,
            index_8.AccountComponent,
            index_8.AgentComponent,
            index_8.AnalyticsComponent,
            index_8.BannedComponent,
            index_8.DepartmentComponent,
            index_8.GoalsComponent,
            index_8.HistoryComponent,
            index_8.PersonalComponent,
            index_8.RolesComponent,
            index_8.RoutingComponent,
            index_8.ShortcutsComponent,
            index_8.TriggersComponent,
            index_8.VisitorsComponent,
            index_8.WidgetComponent,
            index_8.MonitorComponent,
            index_2.ChartWindowComponent,
            index_8.AgentTestComponent,
            fileupload_component_1.FileUploadComponent
        ],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' },
            { provide: core_1.ErrorHandler, useClass: errorhandler_1.default },
            auth_guard_1.AuthGuard,
            index_3.AlertService,
            index_3.AuthenticationService,
            index_3.UserService,
            index_3.UsersService,
            index_3.QuesAnsService,
            index_3.PendingAssistantService,
            index_3.FileService,
            index_3.RoleService,
            index_3.DepartmentService,
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