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
const botframework_webchat_1 = require("botframework-webchat");
let ChartWindowComponent = class ChartWindowComponent {
    constructor() {
        this.model = {
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
    }
    ngOnInit() {
        debugger;
        this.mainid = 'mainID';
        this.divid = 'DivvTestID';
        this.name = 'name';
        botframework_webchat_1.App({
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
};
__decorate([
    core_1.ViewChild("botWindow"),
    __metadata("design:type", core_1.ElementRef)
], ChartWindowComponent.prototype, "botWindowElement", void 0);
ChartWindowComponent = __decorate([
    core_1.Component({
        selector: 'app-chat-window',
        templateUrl: '/app/_directives/chatwindow.component.html'
    }),
    __metadata("design:paramtypes", [])
], ChartWindowComponent);
exports.ChartWindowComponent = ChartWindowComponent;
//# sourceMappingURL=chatwindow.component.js.map