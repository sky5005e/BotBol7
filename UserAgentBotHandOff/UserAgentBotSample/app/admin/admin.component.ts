import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
    // selector: 'app-site',
    templateUrl:'/app/admin/admin.component.html',
})


export class AdminComponent implements OnInit {

    constructor(private Route:Router) { }

    ngOnInit() {
       
    }

}
