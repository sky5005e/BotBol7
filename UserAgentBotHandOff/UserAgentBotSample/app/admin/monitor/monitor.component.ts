import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { PendingAgentAssitant } from '../../_models/index';
import { PendingAssistantService } from '../../_services/index';
import { Global } from '../../_shared/global';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/monitor/monitor.component.html'
})

export class MonitorComponent implements OnInit {

    dates: Date[];
    chartdatashow = false;
   // chartData: Array<any>;
    PAAssitants: PendingAgentAssitant[] = [];
    @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

    constructor(private paService: PendingAssistantService) {

       // setInterval(() => { this.LoadAll(); }, 60 * 60 * 1000);
        
    }
    LoadAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "/monitoring")
            .subscribe(res => {
                this.PAAssitants = res; console.log('data', this.PAAssitants);
                this.LoadChartData();
            });
    }
    chartOptions = {
        responsive: true
    };

    chartData = [
    { data: [9, 6, 4, 8, 4, 3, 8], label: 'Visited' },
    { data: [3, 5, 2, 1, 3, 2, 4], label: 'Pending' },
    { data: [6, 1, 1, 6, 1, 1, 3], label: 'Served' }
    //{ data: this.Data('Visited'), label: 'Visited' },
    //{ data: this.Data('Pending'), label: 'Pending' },
    //{ data: this.Data('Served'), label: 'Served' }

];
    
    chartLabels = [];//['Thursday', 'Friday', 'Saturday', 'Sunday'];

    onChartClick(event) {
        console.log(event);
    }
    
    ngOnInit() {
        //this.LoadAll();
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
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                v = mm + '/' + dd + '/' + yyyy;
                return v;
                // return this.formatDate(v);
            })
            .reverse();

        // this.charts[0].chart.config.data.labels = this.chartLabels; // This line is necessary because ng2-charts is not updating the chart's labels automatically

        this.chartdatashow = true
    }

    LoadChartData() {

        this.chartData = [
            { data: [9, 6, 4, 8, 4, 3, 8], label: 'Visited' },
            { data: [3, 5, 2, 1, 3, 2, 4], label: 'Pending' },
            { data: [6, 1, 1, 6, 1, 1, 3], label: 'Served' }
            //{ data: this.Data('Visited'), label: 'Visited' },
            //{ data: this.Data('Pending'), label: 'Pending' },
            //{ data: this.Data('Served'), label: 'Served' }

        ];


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
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                v = mm + '/' + dd + '/' + yyyy;
                return v;
                // return this.formatDate(v);
            })
            .reverse();

       // this.charts[0].chart.config.data.labels = this.chartLabels; // This line is necessary because ng2-charts is not updating the chart's labels automatically

        this.chartdatashow = true
        console.log(this.chartLabels);
 

    }

    formatDate(date) {

        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        date = mm + '/' + dd + '/' + yyyy;
        return date
    }

    Data(label: string) {
        let data = [];
        // this.dates = Date[] = [];
        this.dates = Array.apply(null, new Array(7))
            .map(function () {
                return new Date();
            })
            .map(function (v, i) {
                v.setDate(v.getDate() - i);
                return v;
            });
        for (var i = 0; i < this.dates.length; i++) {
            let iDate = this.dates[i].getDate();
            console.log("date " + label, iDate);
            if (label == "Served") {

                let point = this.PAAssitants.filter(item =>   item.IsAttended == true);
                data.push(point.length);
            }
            else if (label == "Pending") {
                let point = this.PAAssitants.filter(item =>   item.IsAttended == false);
                data.push(point.length);
            }
            else {
                let point = this.PAAssitants;//.filter(item => );
                data.push(point.length);
            }
        }
        console.log("data " + label, data);
        return data;
    }
}