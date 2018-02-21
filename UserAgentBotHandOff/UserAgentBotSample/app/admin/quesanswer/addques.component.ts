
import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, QuesAnsService, FileService } from '../../_services/index';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/src/ng2-bs3-modal/ng2-bs3-modal';

import { QuesAns } from '../../_models/index';
import { DBOperation } from '../../_shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../_shared/global';


import { Headers, RequestOptions } from "@angular/http";

//declare var jquery: any;
//declare var $: any;

@Component({
    templateUrl: '/app/admin/quesanswer/addques.component.html'
})

export class QuesAnswerComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    quesanswers: any;
    quesans: any;
    msg: string;
    indLoading: boolean = false;
    qaFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    title: string = 'Search';
    file: File;

    constructor(private fb: FormBuilder, private _qaService: QuesAnsService, private fileService: FileService) { }

    ngOnInit(): void {
        this.qaFrm = this.fb.group({
            quesAnsId: [''],
            questionDesc: ['', Validators.required],
            answerDesc: ['', Validators.required],
            created: [''],
            filePath: [''],
            fileName:['']
        });
        this.title = 'Search';
        this.LoadQAS();
    }
    LoadQAS(): void {
        this.indLoading = true;
        this._qaService.get(Global.BASE_QAS_ENDPOINT + '/get')
            .subscribe(quesanswers => { this.quesanswers = quesanswers; this.indLoading = false; /*console.log('data', quesanswers);*/ }
            , error => this.msg = <any>error
            );
    }

    add() {
        //debugger;
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New";
        this.modalBtnTitle = "Add";
        this.qaFrm.reset();
        this.modal.open();
    }

    edit(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.quesans = this.quesanswers.filter(x => x.quesAnsId == id)[0];
        this.qaFrm.setValue(this.quesans);
        this.modal.open();
    }

    delete(id: number) {
        debugger;
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.quesans = this.quesanswers.filter(x => x.quesAnsId == id)[0];
        this.qaFrm.setValue(this.quesans);
        this.modal.open();
    }
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }

    private prepareSave(): any {
        let input = new FormData();
        // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
        input.append('quesAnsId', this.qaFrm.get('quesAnsId').value);
        input.append('questionDesc', this.qaFrm.get('questionDesc').value);
        input.append('answerDesc', this.qaFrm.get('answerDesc').value);
        input.append('created', this.qaFrm.get('created').value);

        input.append('avatar', this.qaFrm.get('avatar').value);
        return input;
    }

    onFileChange(event) {
        let files = event.target.files;
        // this.saveFiles(files);
        if (files.length > 0) {
            this.file = files[0];
        }
    }
    saveFiles(files) {
        debugger;
        if (files.length > 0) {
            let formData: FormData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                quesAnsId: 1,
                questionDesc : 'test'
            }

            this.fileService.upload(formData, parameters)
                .subscribe(
                success => {
                    console.log(success)
                },
                error => {
                })
        }

    }
    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                let _formData: FormData = new FormData();
                //if (files.length > 0) {
                if (this.file != null) {
                    //for (var j = 0; j < files.length; j++) {
                    _formData.append("file", this.file, this.file.name);
                    //}
                    // formData.append()
                }
                    var parameters = {
                        questionDesc: formData._value.questionDesc,
                        answer: formData._value.answerDesc
                    }
                   // _formData.append("value", JSON.stringify(parameters));

                    this.fileService.upload(_formData, parameters)
                        .subscribe(
                        success => {
                            if (success == "1") //Success
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
                        });
                
                /*
                debugger;
                let _formData: FormData = new FormData();
               // _formData.append("value", formData);
                _formData.append('quesAnsId', formData._value.quesAnsId);
                _formData.append('questionDesc', formData._value.questionDesc);
                _formData.append('answerDesc', formData._value.answerDesc);
                _formData.append('created', formData._value.created);

                if (this.file != null)
                    _formData.append("file", this.file, this.file.name);
                
                let headers = new Headers({ processData:false,
        contentType: false });

                let options = new RequestOptions({ headers: headers });


                this._qaService.post(Global.BASE_QAS_ENDPOINT + '/post/', /*formData._value _formData).subscribe(
                //this._qaService.PostImage(Global.BASE_QAS_ENDPOINT + '/post/',  _formData, options).subscribe(
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
                );*/
                break;
            case DBOperation.update:
                this._qaService.put(Global.BASE_QAS_ENDPOINT + '/put/', formData._value.quesAnsId, formData._value).subscribe(
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
                this._qaService.delete(Global.BASE_QAS_ENDPOINT + '/delete/', formData._value.quesAnsId).subscribe(
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