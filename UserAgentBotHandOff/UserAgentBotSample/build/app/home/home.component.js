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
let HomeComponent = class HomeComponent {
    constructor(userService) {
        this.userService = userService;
        this.users = [];
        this.chartData = [
            {
                label: "Sessions",
                data: [1e4, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451]
            }
        ];
        this.chartLabels = ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"];
        this.chartOptions = {
            scales: {
                xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                yAxes: [{
                        ticks: {
                            min: 0,
                            max: 40000,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, .125)",
                        }
                    }],
            },
            legend: {
                display: false
            }
            //scales: {
            //    yAxes: [{
            //        ticks: {
            //            beginAtZero: true
            //        }
            //    }]
            //}
        };
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    onChartClick(event) {
        console.log(event);
    }
    ngOnInit() {
        this.loadAllUsers();
    }
    deleteUser(id) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }
    loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
};
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/home/home.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map