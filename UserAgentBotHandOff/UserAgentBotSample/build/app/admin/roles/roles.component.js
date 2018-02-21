"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("../../_services/index");
const router_1 = require("@angular/router");
const global_1 = require("../../_shared/global");
let RolesComponent = class RolesComponent {
    constructor(route, router, authenticationService, alertService, _roleService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this._roleService = _roleService;
        this.model = {};
        this.loading = false;
    }
    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/roles';
        this.LoadRoles();
    }
    LoadRoles() {
        this._roleService.get(global_1.Global.BASE_ROLES_ENDPOINT + '/get')
            .subscribe(roles => { this.roles = roles; }, error => this.msg = error);
    }
};
RolesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/admin/roles/roles.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        index_1.AuthenticationService,
        index_1.AlertService,
        index_1.RoleService])
], RolesComponent);
exports.RolesComponent = RolesComponent;
//# sourceMappingURL=roles.component.js.map