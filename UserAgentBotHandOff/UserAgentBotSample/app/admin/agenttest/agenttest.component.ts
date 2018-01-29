import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { App } from "botframework-webchat";

@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/agenttest/agenttest.component.html'
})

export class AgentTestComponent implements OnInit {
    direct_line_secret: string;
    user_id: string;
    name: string;

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
        "token":""
    };

       BotChatGoesHere = document.getElementById('BotChatGoesHere');

       @ViewChild("botWindow") botWindowElement: ElementRef;
    ngOnInit() {
        this.direct_line_secret = '35uCpBpXgwo.cwA.0gA.kzVegkk4SVcoWttR2HAVx9-VGU8wyxB93FTTlrlsq9U';
        this.user_id = '106';
        this.name = 'Agent_sky'

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

//import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { App } from "botframework-webchat";
//@Component({
//    selector: 'app-root',
//    template: `<div id="bot-chat-container" #botWindow></div>`,
//})
//export class AgentTestComponent implements OnInit {

//    @ViewChild("botWindow") botWindowElement: ElementRef;

//    ngOnInit(): void {
//        App({
//            directLine: { secret: 'secret goes here' },
//            user: { id: 'user' },
//            bot: { id: 'bot' },
//        }, this.botWindowElement.nativeElement)
//    }
//}
