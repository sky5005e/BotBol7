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
const router_1 = require("@angular/router");
const index_1 = require("../_services/index");
const platform_browser_1 = require("@angular/platform-browser");
let LoginComponent = class LoginComponent {
    constructor(route, router, authenticationService, alertService, sanitizer) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.sanitizer = sanitizer;
        this.model = {};
        this.loading = false;
    }
    //Add the class to body tag when the View is initialized
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("bg-danger");
        body.classList.remove("fixed-nav");
        body.classList.remove("sticky-footer");
        body.classList.remove("bg-dark");
        body.style.background = 'url(assets/img/bge.jpg) no-repeat; background-size:cover;';
    }
    //Remove the class from body tag when the View is destroyed
    ngOnDestroy() {
        //let body = document.getElementsByTagName('body')[0];
        //body.classList.remove("bg-danger");
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("bg-danger");
            body.classList.add("fixed-nav");
            body.classList.add("sticky-footer");
            body.classList.add("bg-dark");
            body.style.removeProperty("background");
        }, error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/login/login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        index_1.AuthenticationService,
        index_1.AlertService,
        platform_browser_1.DomSanitizer])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map