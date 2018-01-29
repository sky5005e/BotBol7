import { Component, OnInit } from '@angular/core';

import { PendingAgentAssitant } from '../../_models/index';
import { PendingAssistantService } from '../../_services/index';
import { Global } from '../../_shared/global';

@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/monitor/monitor.component.html'
})

export class MonitorComponent implements OnInit {

    dates: string[];
    
    PendingAgentAssitants: PendingAgentAssitant[] = [];

    constructor(private paService: PendingAssistantService) {

        setInterval(() => { this.LoadAll(); }, 60 * 1000);
    }
    LoadAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT)
            .subscribe(PendingAgentAssitants => { this.PendingAgentAssitants = PendingAgentAssitants; console.log('data', PendingAgentAssitants); }
            );
    }
    chartOptions = {
        responsive: true
    };

    chartData = [
        { data: [330, 600, 260, 700], label: 'Visited' },
        { data: [120, 455, 100, 340], label: 'Pending' },
        { data: [45, 67, 80, 150], label: 'Served' }
    ];

    chartLabels = ['Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
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
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        date = mm + '/' + dd + '/' + yyyy;
        return date
    }
}