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
    PAAssitants: any;
    @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

    constructor(private paService: PendingAssistantService) {
       // setInterval(() => { this.LoadAll(); }, 60 * 60 * 1000);
    }
    onChartClick(event) {
        console.log(event);
    }

    chartOptions = {
        responsive: true
    };
    chartLabels = [];
    chartData = [];
    LoadAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "/monitoring/7")
            .subscribe(res => {
                this.PAAssitants = res; //console.log('data', this.PAAssitants);
                this.LoadChartData(true);
            });
    }
    
    ngOnInit() {
        this.LoadChartData(false);
        this.LoadAll();
        this.chartdatashow = true
    }

    LoadChartData(isdata: boolean) {
        
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
            })
            .reverse();
        this.chartdatashow = true
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
                { data: [0,0,0,0,0,0,0], label: 'Visited' },
                { data: [0,0,0,0,0,0,0], label: 'Pending' },
                { data: [0,0,0,0,0,0,0], label: 'Served' }];

        }

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
}