
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService, UsersService } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';
import { IUser } from '../_models/index';
import { DBOperation } from '../_shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../_shared/global';

@Component({
    templateUrl: '/app/user/user.component.html'
})

export class UsersComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent ;
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    title: string = 'Search';

    constructor(private fb: FormBuilder, private _userService: UsersService) { }

    ngOnInit(): void {
        this.userFrm = this.fb.group({
            Id: [''],
            UserName: ['', Validators.required],
            Channel: ['']//,
            //Gender: ['', Validators.required]
        });
        this.title = 'Search';
        this.LoadUsers();
    }

    LoadUsers(): void {
        this.indLoading = true;
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; }
            //,error => this.msg = <any>error
        );
    }

    addUser() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    }

    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        //this.user =
        let usert = this.users.filter(x => x.Id == id);
        console.log("usert", usert);

        //[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
    onSubmit(formData: any) {
        this.msg = "";
   
        switch (this.dbops) {
            case DBOperation.create:
                this._userService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadUsers();
                        }
                        else
                        {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        
                        this.modal.dismiss();
                    },
                    error => {
                      this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
}