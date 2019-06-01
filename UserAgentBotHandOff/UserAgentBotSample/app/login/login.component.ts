import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    templateUrl: '/app/login/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private sanitizer: DomSanitizer) { }
    //Add the class to body tag when the View is initialized
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("bg-danger");
        body.classList.remove("fixed-nav");
        body.classList.remove("sticky-footer");
        body.classList.remove("bg-dark");

        body.style.background = 'url(assets/img/bge.jpg) no-repeat';
        body.style.backgroundSize = 'cover';

    }

    //Remove the class from body tag when the View is destroyed
    ngOnDestroy() {
        //let body = document.getElementsByTagName('body')[0];
        //body.classList.remove("bg-danger");
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    let body = document.getElementsByTagName('body')[0];
                    body.classList.remove("bg-danger");
                    body.classList.add("fixed-nav");
                    body.classList.add("sticky-footer");
                    body.classList.add("bg-dark");
                    body.style.removeProperty("background");
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
