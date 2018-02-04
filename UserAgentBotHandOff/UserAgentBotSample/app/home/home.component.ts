import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: '/app/home/home.component.html'
})

export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    private chartData = [
        {
            label: "Sessions",
            data: [8, 4, 12, 7, 15, 12, 5, 8, 5, 6, 20, 2, 15, 8, 4]// 12, 7, 15, 12, 5, 8, 5, 6, 20, 2, 15,12, 8, 24]
        }
    ];

    private chartLabels = [//"Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12", "Jan 13","Jan 14", "Jan 15","Jan 16", 
        "Jan 17", "Jan 18", "Jan 19", "Jan 20", "Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29", "Jan 30", "Jan 31"];

    chartOptions = {
        responsive: true
    };
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

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}