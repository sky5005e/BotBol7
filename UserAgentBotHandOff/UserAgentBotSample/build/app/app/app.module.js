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
const auth_guard_1 = require("./_guards/auth.guard");
const index_6 = require("./_services/index");
const index_7 = require("./home/index");
const index_8 = require("./login/index");
const index_9 = require("./register/index");
const index_10 = require("./forgotpassword/index");
const index_11 = require("./admin/index");
const index_12 = require("./admin/index");
const index_13 = require("./admin/index");
const index_14 = require("./user/index");
const index_15 = require("./_filter/index");
const search_component_1 = require("./_shared/search.component");
const errorhandler_1 = require("./_shared/errorhandler");
const index_16 = require("./admin/quesanswer/index");
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
            ng2_bs3_modal_1.Ng2Bs3ModalModule
        ],
        declarations: [
            app_component_1.AppComponent,
            index_2.AlertComponent,
            index_3.AdminHeaderComponent,
            index_4.AdminFooterComponent,
            index_7.HomeComponent,
            index_8.LoginComponent,
            index_9.RegisterComponent,
            index_10.ForgotPasswordComponent,
            index_11.AdminComponent,
            index_14.UsersComponent,
            index_15.UserFilterPipe,
            search_component_1.SearchComponent,
            index_5.LogoutComponent,
            index_13.HistoryComponent,
            index_12.AgentComponent,
            index_16.QuesAnswerComponent
        ],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' },
            { provide: core_1.ErrorHandler, useClass: errorhandler_1.default },
            auth_guard_1.AuthGuard,
            index_6.AlertService,
            index_6.AuthenticationService,
            index_6.UserService,
            index_6.UsersService,
            index_6.QuesAnsService,
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