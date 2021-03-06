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
const ng2_charts_1 = require("ng2-charts/ng2-charts");
let MonitorComponent = class MonitorComponent {
    constructor(paService) {
        this.paService = paService;
        this.chartdatashow = false;
        this.chartOptions = {
            responsive: true
        };
        this.chartLabels = [];
        this.chartData = [];
        // setInterval(() => { this.LoadAll(); }, 60 * 60 * 1000);
    }
    onChartClick(event) {
        console.log(event);
    }
    LoadAll() {
        this.paService.get(global_1.Global.BASE_CAA_ENDPOINT + "/monitoring/7")
            .subscribe(res => {
            this.PAAssitants = res; //console.log('data', this.PAAssitants);
            this.LoadChartData(true);
        });
    }
    ngOnInit() {
        this.LoadChartData(false);
        this.LoadAll();
        this.chartdatashow = true;
    }
    LoadChartData(isdata) {
        this.chartLabels = Array.apply(null, new Array(7))
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
        })
            .reverse();
        this.chartdatashow = true;
        // console.log(this.chartLabels);
        if (isdata) {
            this.chartData = [
                { data: this.Data('Visited'), label: 'Visited' },
                { data: this.Data('Pending'), label: 'Pending' },
                { data: this.Data('Served'), label: 'Served' }
            ];
        }
        else {
            this.chartData = [
                { data: [0, 0, 0, 0, 0, 0, 0], label: 'Visited' },
                { data: [0, 0, 0, 0, 0, 0, 0], label: 'Pending' },
                { data: [0, 0, 0, 0, 0, 0, 0], label: 'Served' }
            ];
        }
    }
    Data(label) {
        let data = [];
        // this.dates = Date[] = [];
        this.dates = Array.apply(null, new Array(7))
            .map(function () {
            return new Date();
        })
            .map(function (v, i) {
            v.setDate(v.getDate() - i);
            return v;
        }).reverse();
        for (var i = 0; i < this.dates.length; i++) {
            let iDate = this.dates[i];
            if (label == "Served") {
                let point = this.PAAssitants.filter(item => item.isAttended == true && new Date(item.created).getDate() == iDate.getDate());
                data.push(point.length);
            }
            else if (label == "Pending") {
                let point = this.PAAssitants.filter(item => item.isAttended == false && new Date(item.created).getDate() == iDate.getDate());
                data.push(point.length);
            }
            else {
                let point = this.PAAssitants.filter(item => new Date(item.created).getDate() == iDate.getDate());
                data.push(point.length);
            }
        }
        return data;
    }
};
__decorate([
    core_1.ViewChildren(ng2_charts_1.BaseChartDirective),
    __metadata("design:type", core_1.QueryList)
], MonitorComponent.prototype, "charts", void 0);
MonitorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/admin/monitor/monitor.component.html'
    }),
    __metadata("design:paramtypes", [index_1.PendingAssistantService])
], MonitorComponent);
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=monitor.component.js.map