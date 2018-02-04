import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { App } from "botframework-webchat";

@Component({
    selector: 'app-chat-window',
    templateUrl: '/app/_directives/chatwindow.component.html'
})
export class ChartWindowComponent implements OnInit {
    divid: string;
    mainid: string;
    name: string;
    @ViewChild("botWindow") botWindowElement: ElementRef;
    constructor() { }
    
    model = {
        "userId": "E2LVkp79VXo",
        "userName": "AgentSky",
        "botId": "useragentbot_FhIXuWlwjYT",
        "botIconUrl": "https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png",
        "botName": "UserAgentBot",
        "secret": "35uCpBpXgwo.cwA.0gA.kzVegkk4SVcoWttR2HAVx9-VGU8wyxB93FTTlrlsq9U",
        "iconUrl": "https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png",
        "directLineUrl": "https://webchat.botframework.com/v3/directline",
        "webSocketEnabled": "false",
        "speechTokenEndpoint": "https://api.botframework.com/v3/speechtoken",
        "useLatestWebChat": false,
        "token": ""
    };

    ngOnInit() {
        debugger;
        this.mainid = 'mainID';
        this.divid = 'DivvTestID';
        this.name = 'name';
        App({
            directLine: {
                secret: this.model.secret,
                token: this.model.token,
                domain: this.model.directLineUrl,
                webSocket: false
            },
            user: { id: this.model.userId, name: this.model.userName },
            bot: { id: this.model.botId, name: this.model.botName },
            resize: 'window',
            locale: 'en'
        }, this.botWindowElement.nativeElement);

    }
}
