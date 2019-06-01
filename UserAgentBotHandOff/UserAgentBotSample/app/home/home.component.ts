import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { PendingAssistantService } from '../_services/index';
import { Global } from '../_shared/global';

@Component({
    moduleId: module.id,
    templateUrl: '/app/home/home.component.html'
})

export class HomeComponent implements OnInit {

    currentUser: any;
    users: User[] = [];
    dates: Date[];
    chartdatashow = false;
    PAAssitants: any;
    chats: any;

    constructor(private userService: UserService, private paService: PendingAssistantService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("currentUser", this.currentUser);
    }
    
    chartOptions = {
        responsive: true
    };
    chartLabels = [];
    chartData = [];

    onChartClick(event) {
        console.log(event);

       
    }
    ngOnInit() {
        this.LoadChartData(false);
        this.loadAllUsers();
        this.LoadChartAll();

        this.LoadChats();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    LoadChartAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "/monitoring/15")
            .subscribe(res => {
                this.PAAssitants = res; console.log('data', this.PAAssitants);
                this.LoadChartData(true);
            });
    }

    LoadChats(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "/chats/10")
            .subscribe(res => {
                this.chats = res; console.log('chats', this.chats);
            });
    }

    LoadChartData(isdata: boolean) {

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
                return m + ' ' + (d <= 9 ? '0' + d : d);//'' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
                
            })
            .reverse();
        this.chartdatashow = true
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

    Data(label: string) {
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
}