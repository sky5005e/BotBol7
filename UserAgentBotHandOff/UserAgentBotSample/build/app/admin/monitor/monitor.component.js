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
const global_1 = require("../../_shared/global");
let MonitorComponent = class MonitorComponent {
    constructor(paService) {
        this.paService = paService;
        this.PendingAgentAssitants = [];
        this.chartOptions = {
            responsive: true
        };
        this.chartData = [
            { data: [330, 600, 260, 700], label: 'Visited' },
            { data: [120, 455, 100, 340], label: 'Pending' },
            { data: [45, 67, 80, 150], label: 'Served' }
        ];
        this.chartLabels = ['Thursday', 'Friday', 'Saturday', 'Sunday'];
        setInterval(() => { this.LoadAll(); }, 60 * 1000);
    }
    LoadAll() {
        this.paService.get(global_1.Global.BASE_CAA_ENDPOINT)
            .subscribe(PendingAgentAssitants => { this.PendingAgentAssitants = PendingAgentAssitants; console.log('data', PendingAgentAssitants); });
    }
    onChartClick(event) {
        console.log(event);
    }
    ngOnInit() {
        this.dates = Array.apply(null, new Array(7))
            .map(function () {
            return new Date();
        })
            .map(function (v, i) {
            v.setDate(v.getDate() - i);
            return v;
        })
            .map(function (v) {
            var dd = v.getDate();
            var mm = v.getMonth() + 1;
            var yyyy = v.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            v = mm + '/' + dd + '/' + yyyy;
            return v;
            // return this.formatDate(v);
        })
            .reverse()
            .join(',');
        console.log(this.chartLabels);
    }
    formatDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }
};
MonitorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/admin/monitor/monitor.component.html'
    }),
    __metadata("design:paramtypes", [index_1.PendingAssistantService])
], MonitorComponent);
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=monitor.component.js.map