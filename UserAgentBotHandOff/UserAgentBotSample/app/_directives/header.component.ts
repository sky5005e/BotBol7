import { Component,  OnInit } from '@angular/core';

import { PendingAgentAssitant } from '../_models/index';
import { PendingAssistantService } from '../_services/index';

import { Global } from '../_shared/global';

@Component({
    selector: 'app-admin-header',
    templateUrl: '/app/_directives/header.component.html'
})
export class AdminHeaderComponent implements OnInit {

    PendingAgentAssitants: PendingAgentAssitant[] = [];
    chats: any;

    constructor(private paService: PendingAssistantService) {

        setInterval(() => { this.LoadAll(); }, 60 * 1000);
    }
    

    ngOnInit() {
        this.LoadAll();
        this.LoadMessage();
    }

    LoadAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT +"get")
            .subscribe(PendingAgentAssitants => { this.PendingAgentAssitants = PendingAgentAssitants; console.log('data', PendingAgentAssitants); }
            );
    }
    
    LoadMessage(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "chats/5")
            .subscribe(res => { this.chats = res; console.log('data', this.chats); }
            );
    }

}
