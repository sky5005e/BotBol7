import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, PendingAssistantService } from '../../_services/index';

import { Global } from '../../_shared/global';

@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/history/history.component.html'
})

export class HistoryComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    chats: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private paService: PendingAssistantService) { }

    ngOnInit() {
        this.LoadMessage();
    }
    LoadMessage(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "chats/30")
            .subscribe(res => { this.chats = res; console.log('data', this.chats); }
            );
    }
    
}
