﻿
import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, QuesAnsService, FileService, AuthenticationService, RoleService } from '../../_services/index';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';

import { DBOperation } from '../../_shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../_shared/global';


import { Headers, RequestOptions } from "@angular/http";


@Component({
    moduleId: module.id,
    templateUrl: '/app/admin/roles/roles.component.html'
})

export class RolesComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    listFilter: string;
    roles: any;
    msg: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private _roleService: RoleService,
    ) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/roles';
        this.LoadRoles();
    }
    LoadRoles(): void {
        this._roleService.get(Global.BASE_ROLES_ENDPOINT + '/get')
            .subscribe(roles => { this.roles = roles;  }
            , error => this.msg = <any>error
            );
    }


}
