import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: '/app/terms/terms.component.html'
})

export class TermsComponent {

    ngOnInit() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("bg-danger");
        body.style.removeProperty("background");

    }
}