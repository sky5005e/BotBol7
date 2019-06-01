import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
/*import { App } from "botframework-webchat";
import { DirectLine } from 'botframework-directlinejs';*/
import { PendingAgentAssitant } from '../../_models/index';
import { PendingAssistantService } from '../../_services/index';

import { Global } from '../../_shared/global';

import 'assets/js/skyexternal.js'

declare var skyExtObject: any;

@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/agentchat/agentchat.component.html'
})

export class AgentChatComponent implements OnInit {

    PendingAgentAssitants: PendingAgentAssitant[] = [];
    showpopup = false;
    currentUser: any;
    constructor(private paService: PendingAssistantService) {

        setInterval(() => { this.LoadAll(); }, 60 * 1000);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }


    LoadAll(): void {
        this.paService.get(Global.BASE_CAA_ENDPOINT + "/get")
            .subscribe(PendingAgentAssitants => { this.PendingAgentAssitants = PendingAgentAssitants; console.log('data', PendingAgentAssitants); }
            );
    }

    ngOnInit() {
        this.LoadAll();
    }
    DisplayChat(id: string, name: string) {
        console.log(id);
        console.log(name);
        skyExtObject.register_popup(id, name, this.currentUser.userId, this.currentUser.firstName);
    }
} /*

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

    chats = document.getElementById("chats");
    messages = document.getElementById("messages");


    @ViewChild("botWindow") botWindowElement: ElementRef;

    //App({
        //    directLine: {
        //        secret: this.model.secret,
        //        token: this.model.token,
        //        domain: this.model.directLineUrl,
        //        webSocket: false
        //    },
        //    user: { id: this.model.userId, name: this.model.userName },
        //    bot: { id: this.model.botId, name: this.model.botName },
        //    resize: 'window',
        //    locale: 'en'
        //}, this.botWindowElement.nativeElement);

    directLine = new DirectLine({
        secret: this.model.secret,
        token: this.model.token,
        domain: this.model.directLineUrl,
        webSocket: false
    });*/
    /*
    postButtonMessage() {
        //this.createIframe('test12');

        const inputs = document.getElementsByClassName('wc-shellinput')[0] as HTMLInputElement;
        inputs.focus();
        inputs.value = 'Hi Hello from button click ';

        //inputs.form.submit();

        const wcsend = document.getElementsByClassName('wc-send')[0] as HTMLButtonElement;


        setTimeout(() => {
            wcsend.focus();
            wcsend.click();

        }
            , 8 * 1000);
        
    }
    postButtonMessage2() {
        
        const wcsend = document.getElementsByClassName('wc-send')[0] as HTMLButtonElement;


        setTimeout(() => {
            wcsend.focus();
            wcsend.click();

        }
            , 8 * 1000);

       
    }

    commandRequestUser() {

        this.directLine.postActivity({
            from: { id: this.model.userId, name: this.model.userName }, // required (from.name is optional)
            type: 'message',
            text: 'command list requests'
        })
            .subscribe(function (res) {
                alert(3);
                console.log("data", res);
                
            });
    }

    sendToBot(id: string, conversationId: string) {
        const iframe = (document.getElementById(id) as HTMLIFrameElement).contentWindow;
        console.log("iframe", id);
       // var doc = iframe.document;// || iframe.document;

        //const inputs = doc.getElementsByClassName('wc-shellinput')[0] as HTMLInputElement;//').innerText
        debugger;
       // inputs.focus();
       // inputs.value = 'Hello from server to  Iframe';
        //inputs.form.submit();

       // const wcsend = document.getElementsByClassName('wc-send')[0] as HTMLButtonElement;


      //  setTimeout(() => {
           // wcsend.focus();
           // wcsend.click();

      //  }
      //      , 8 * 1000);


        // iframe.postMessage( conversationId );//, window.location.origin);

    }
    
    */
    /*
     //this function can remove a array element.
     ArrayRemove(array, from, to) {
         var rest = array.slice((to || from) + 1 || array.length);
         array.length = from < 0 ? array.length + from : from;
         return array.push.apply(array, rest);
     };
     //this variable represents the total number of popups can be displayed according to the viewport width
     total_popups = 0;

     //arrays of popups ids
     popups = [];

     //this is used to close a popup
     close_popup(id) {
         console.log("ID ", id);
         for (var iii = 0; iii < this.popups.length; iii++) {
             if (id == this.popups[iii]) {
                 this.ArrayRemove(this.popups, iii, 0);

                 document.getElementById(id).style.display = "none";

                 this.calculate_popups();

                 return;
             }
         }
     }

     //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
     display_popups() {
         skyExtObject.display_popups();
         
         var right = 220;

         var iii = 0;
         for (iii; iii < this.total_popups; iii++) {
             if (this.popups[iii] != undefined) {
                 var element = document.getElementById(this.popups[iii]);
                 element.style.right = right + "px";
                 right = right + 320;
                 element.style.display = "block";
             }
         }

         for (var jjj = iii; jjj < this.popups.length; jjj++) {
             var element = document.getElementById(this.popups[jjj]);
             element.style.display = "none";
         }
     }
    

     DisplayChat(id: string, name: string) {
         //skyExtObject.func1();

         //const divchatwindow = <HTMLDivElement>document.createElement('app-chat-window');
       
         //document.getElementById("bot-container").appendChild(divchatwindow);


         
         
         console.log(id);
         console.log(name);
         skyExtObject.register_popup(id, name);
         /*
         for (var iii = 0; iii < this.popups.length; iii++) {
             //already registered. Bring it to front.
             if (id == this.popups[iii]) {
                 this.ArrayRemove(this.popups, iii, 0);

                 this.popups.unshift(id);

                 this.calculate_popups();


                 return;
             }
         }
        */
        // var element = '<div class="popup-box chat-popup" id="' + id + '">';
         // element = element + '<div class="popup-head">';
          //element = element + '<div class="popup-head-left">' + name + '</div>';
          //element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\'' + id + '\');">&#10005;</a></div>';
          //element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div></div>';
        //  document.getElementById("bot-container").innerHTML = document.getElementById("bot-container").innerHTML + element;
         /*
         const divElement = <HTMLDivElement>document.createElement('div');
         divElement.classList.add('popup-box', 'chat-popup');
         divElement.id = id;

         const ifid = `botchat_${id}`;
         const iframe = <HTMLIFrameElement>document.createElement('iframe');
         iframe.id = ifid;
         iframe.src = 'https://webchat.botframework.com/embed/useragentbot_FhIXuWlwjYT?s=35uCpBpXgwo.cwA.0gA.kzVegkk4SVcoWttR2HAVx9-VGU8wyxB93FTTlrlsq9U&userId=E2LVkp79VXo&userName=AgentSky';
         iframe.width = "320";
         iframe.height = "360";
         iframe.onload = (event: Event) => {
             //this.sendToBot(id, conversationId);
             //this.AcceptUser(ifid);
         };
         //const divElementMsg = <HTMLDivElement>document.createElement('div');
         ////divElement.classList.add('popup-box', 'chat-popup');
         ////divElement.id = id;
         //divElementMsg.style.backgroundColor = '#6d84b4';
         //divElementMsg.innerHTML = `User : ${name} <br/> Command for channel aggregation:<br/> <b>command watch</b> <br/><textarea style='width :100%;'>command accept ${id}</textarea><br/> `;
         //divElement.appendChild(divElementMsg);
         const divElementMsg = <HTMLDivElement>document.createElement('div');
         divElementMsg.classList.add('popup-head');
         divElementMsg.innerHTML = `<div class="popup-head-left">User : ${name}</div><div class="popup-head-right"><a onclick="skyExtObject.close_popup(${id});">&#10005;</a></div>
		 <div style="clear: both"></div>Command for channel aggregation:<br/> <b>command watch</b> <br/><textarea style='width :100%;'>command accept ${id}</textarea><br/>`;
         divElement.appendChild(divElementMsg);

         divElement.appendChild(iframe);
         document.getElementById("bot-container").appendChild(divElement);
         */
         /*
         this.popups.unshift(id);

         this.calculate_popups();
         
         
     }
    /*
     //calculate the total number of popups suitable and then populate the toatal_popups variable.
     calculate_popups() {
         let width = window.innerWidth;
         if (width < 540) {
             this.total_popups = 0;
         }
         else {
             width = width - 200;
             //320 is width of a single popup box
             this.total_popups = width / 320;
         }

         this.display_popups();

     }
    
     AcceptUser(id: string) {
         if (id != "") {
             debugger;
             const iframe = (document.getElementById(id) as HTMLIFrameElement).contentWindow;
             console.log("iframe", id);
             var doc = iframe.document;// || iframe.document;
             debugger;
             const inputs = doc.getElementsByClassName('wc-shellinput')[0] as HTMLInputElement;//').innerText

             inputs.focus();
             inputs.value = 'Hello from server to  Iframe';
             inputs.form.submit();

             const wcsend = document.getElementsByClassName('wc-send')[0] as HTMLButtonElement;

             setTimeout(() => {
                 wcsend.click();
             }, 8 * 1000);
         }
     }

    
}*/
