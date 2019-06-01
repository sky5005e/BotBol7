import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: '/app/privacy/privacy.component.html'
})

export class PrivacyComponent {

    ngOnInit() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("bg-danger");
        body.style.removeProperty("background");

    }
}