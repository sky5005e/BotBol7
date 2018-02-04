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
const index_1 = require("../_services/index");
const global_1 = require("../_shared/global");
let AdminHeaderComponent = class AdminHeaderComponent {
    constructor(paService) {
        this.paService = paService;
        this.PendingAgentAssitants = [];
        setInterval(() => { this.LoadAll(); }, 60 * 1000);
    }
    ngOnInit() {
        this.LoadAll();
    }
    LoadAll() {
        this.paService.get(global_1.Global.BASE_CAA_ENDPOINT + "/get")
            .subscribe(PendingAgentAssitants => { this.PendingAgentAssitants = PendingAgentAssitants; console.log('data', PendingAgentAssitants); });
    }
};
AdminHeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-header',
        templateUrl: '/app/_directives/header.component.html'
    }),
    __metadata("design:paramtypes", [index_1.PendingAssistantService])
], AdminHeaderComponent);
exports.AdminHeaderComponent = AdminHeaderComponent;
//# sourceMappingURL=header.component.js.map