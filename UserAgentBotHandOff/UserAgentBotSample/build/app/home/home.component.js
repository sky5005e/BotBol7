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
const index_2 = require("../_services/index");
const global_1 = require("../_shared/global");
let HomeComponent = class HomeComponent {
    constructor(userService, paService) {
        this.userService = userService;
        this.paService = paService;
        this.users = [];
        this.chartdatashow = false;
        this.chartOptions = {
            responsive: true
        };
        this.chartLabels = [];
        this.chartData = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("currentUser", this.currentUser);
    }
    onChartClick(event) {
        console.log(event);
    }
    ngOnInit() {
        this.LoadChartData(false);
        this.loadAllUsers();
        this.LoadChartAll();
        this.LoadChats();
    }
    deleteUser(id) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }
    loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    LoadChartAll() {
        this.paService.get(global_1.Global.BASE_CAA_ENDPOINT + "/monitoring/15")
            .subscribe(res => {
            this.PAAssitants = res;
            console.log('data', this.PAAssitants);
            this.LoadChartData(true);
        });
    }
    LoadChats() {
        this.paService.get(global_1.Global.BASE_CAA_ENDPOINT + "/chats/10")
            .subscribe(res => {
            this.chats = res;
            console.log('chats', this.chats);
        });
    }
    LoadChartData(isdata) {
        this.chartLabels = Array.apply(null, new Array(15))
            .map(function () {
            return new Date();
        })
            .map(function (v, i) {
            v.setDate(v.getDate() - i);
            return v;
        })
            .map(function (v) {
            var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var d = v.getDate();
            var m = strArray[v.getMonth()];
            var y = v.getFullYear();
            return m + ' ' + (d <= 9 ? '0' + d : d); //'' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
        })
            .reverse();
        this.chartdatashow = true;
        // console.log(this.chartLabels);
        if (isdata) {
            this.chartData = [
                { data: this.Data('Visited'), label: 'Visited' },
            ];
        }
        else {
            this.chartData = [
                {
                    label: "Visited",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ];
        }
    }
    Data(label) {
        let data = [];
        // this.dates = Date[] = [];
        this.dates = Array.apply(null, new Array(15))
            .map(function () {
            return new Date();
        })
            .map(function (v, i) {
            v.setDate(v.getDate() - i);
            return v;
        }).reverse();
        for (var i = 0; i < this.dates.length; i++) {
            let iDate = this.dates[i];
            let point = this.PAAssitants.filter(item => new Date(item.created).getDate() == iDate.getDate());
            data.push(point.length);
        }
        return data;
    }
};
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/home/home.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService, index_2.PendingAssistantService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map