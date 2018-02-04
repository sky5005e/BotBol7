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
                data: [8, 4, 12, 7, 15, 12, 5, 8, 5, 6, 20, 2, 15, 8, 4] // 12, 7, 15, 12, 5, 8, 5, 6, 20, 2, 15,12, 8, 24]
            }
        ];
        this.chartLabels = [
            "Jan 17", "Jan 18", "Jan 19", "Jan 20", "Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29", "Jan 30", "Jan 31"
        ];
        this.chartOptions = {
            responsive: true
        };
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    //private chartOptions = {
    //    scales: {
    //        xAxes: [{
    //            time: {
    //                unit: 'date'
    //            },
    //            gridLines: {
    //                display: false
    //            },
    //            ticks: {
    //                maxTicksLimit: 7
    //            }
    //        }],
    //        yAxes: [{
    //            ticks: {
    //                min: 0,
    //                max: 40000,
    //                maxTicksLimit: 5
    //            },
    //            gridLines: {
    //                color: "rgba(0, 0, 0, .125)",
    //            }
    //        }],
    //    },
    //    legend: {
    //        display: false
    //    }
    //    //scales: {
    //    //    yAxes: [{
    //    //        ticks: {
    //    //            beginAtZero: true
    //    //        }
    //    //    }]
    //    //}
    //};
    onChartClick(event) {
        console.log(event);
    }
    ngOnInit() {
        /*
        this.chartLabels = Array.apply(null, new Array(30))
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
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                v = mm + '/' + dd + '/' + yyyy;
                return v;
                // return this.formatDate(v);
            })
            .reverse();

        */
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