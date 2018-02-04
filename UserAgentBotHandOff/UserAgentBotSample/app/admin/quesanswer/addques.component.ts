
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService, QuesAnsService } from '../../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';
import { QuesAns } from '../../_models/index';
import { DBOperation } from '../../_shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../_shared/global';

@Component({
    templateUrl: '/app/admin/quesanswer/addques.component.html'
})

export class QuesAnswerComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    quesanswers: QuesAns[];
    quesans: QuesAns;
    msg: string;
    indLoading: boolean = false;
    qaFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    title: string = 'Search';

    constructor(private fb: FormBuilder, private _qaService: QuesAnsService) { }

    ngOnInit(): void {
        this.qaFrm = this.fb.group({
            QuesAnsId: [''],
            QuestionDesc: ['', Validators.required],
            AnswerDesc: ['', Validators.required]
        });
        this.title = 'Search';
        this.LoadQAS();
    }

    LoadQAS(): void {
        this.indLoading = true;
        this._qaService.get(Global.BASE_QAS_ENDPOINT+'/get')
            .subscribe(quesanswers => { this.quesanswers = quesanswers; this.indLoading = false; console.log('data', quesanswers); }
               //,error => this.msg = <any>error
               
        );
       }

    add() {
        //debugger;
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New";
        this.modalBtnTitle = "Add";
        this.qaFrm.reset();
       // this.modal.open();
    }

    edit(id: number) {
        //debugger;
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        //debugger;
        console.log("data", this.quesanswers);
        this.quesans = this.quesanswers.filter(x => x.QuesAnsId == id)[0];

        console.log("quesans", this.quesans);
        //debugger;
        this.qaFrm.setValue(this.quesans);
        //this.modal.open();
    }

    delete(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        //debugger;
        console.log("data", this.quesanswers);
        this.quesans = this.quesanswers.filter(x => x.QuesAnsId == id)[0];

        console.log("quesans", this.quesans);
        //debugger;
        this.qaFrm.setValue(this.quesans);
        //this.modal.open();
    }
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }
    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._qaService.post(Global.BASE_QAS_ENDPOINT+'/post', formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.modal.dismiss();
                            this.LoadQAS();
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
            case DBOperation.update:
                this._qaService.put(Global.BASE_USER_ENDPOINT +'/put', formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadQAS();
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
                this._qaService.delete(Global.BASE_USER_ENDPOINT +'/delete', formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadQAS();
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

    SetControlsState(isEnable: boolean) {
        isEnable ? this.qaFrm.enable() : this.qaFrm.disable();
    }
}