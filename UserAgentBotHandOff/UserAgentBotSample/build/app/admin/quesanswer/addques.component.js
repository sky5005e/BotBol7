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
const index_1 = require("../../_services/index");
const forms_1 = require("@angular/forms");
const ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
const enum_1 = require("../../_shared/enum");
const global_1 = require("../../_shared/global");
//declare var jquery: any;
//declare var $: any;
let QuesAnswerComponent = class QuesAnswerComponent {
    constructor(fb, _qaService, fileService) {
        this.fb = fb;
        this._qaService = _qaService;
        this.fileService = fileService;
        this.indLoading = false;
        this.title = 'Search';
    }
    ngOnInit() {
        this.qaFrm = this.fb.group({
            quesAnsId: [''],
            questionDesc: ['', forms_1.Validators.required],
            answerDesc: ['', forms_1.Validators.required],
            created: [''],
            filePath: [''],
            fileName: ['']
        });
        this.title = 'Search';
        this.LoadQAS();
    }
    LoadQAS() {
        this.indLoading = true;
        this._qaService.get(global_1.Global.BASE_QAS_ENDPOINT + '/get')
            .subscribe(quesanswers => { this.quesanswers = quesanswers; this.indLoading = false; /*console.log('data', quesanswers);*/ }, error => this.msg = error);
    }
    add() {
        //debugger;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New";
        this.modalBtnTitle = "Add";
        this.qaFrm.reset();
        this.modal.open();
    }
    edit(id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.quesans = this.quesanswers.filter(x => x.quesAnsId == id)[0];
        this.qaFrm.setValue(this.quesans);
        this.modal.open();
    }
    delete(id) {
        debugger;
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.quesans = this.quesanswers.filter(x => x.quesAnsId == id)[0];
        this.qaFrm.setValue(this.quesans);
        this.modal.open();
    }
    criteriaChange(value) {
        if (value != '[object Event]')
            this.listFilter = value;
    }
    prepareSave() {
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
            let formData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                quesAnsId: 1,
                questionDesc: 'test'
            };
            this.fileService.upload(formData, parameters)
                .subscribe(success => {
                console.log(success);
            }, error => {
            });
        }
    }
    onSubmit(formData) {
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                let _formData = new FormData();
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
                };
                // _formData.append("value", JSON.stringify(parameters));
                this.fileService.upload(_formData, parameters)
                    .subscribe(success => {
                    if (success == "1") {
                        this.msg = "Data successfully added.";
                        this.modal.dismiss();
                        this.LoadQAS();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    this.modal.dismiss();
                }, error => {
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
            case enum_1.DBOperation.update:
                this._qaService.put(global_1.Global.BASE_QAS_ENDPOINT + '/put/', formData._value.quesAnsId, formData._value).subscribe(data => {
                    if (data == 1) {
                        this.msg = "Data successfully updated.";
                        this.LoadQAS();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    this.modal.dismiss();
                }, error => {
                    this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._qaService.delete(global_1.Global.BASE_QAS_ENDPOINT + '/delete/', formData._value.quesAnsId).subscribe(data => {
                    if (data == 1) {
                        this.msg = "Data successfully deleted.";
                        this.LoadQAS();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    this.modal.dismiss();
                }, error => {
                    this.msg = error;
                });
                break;
        }
    }
    SetControlsState(isEnable) {
        isEnable ? this.qaFrm.enable() : this.qaFrm.disable();
    }
};
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], QuesAnswerComponent.prototype, "modal", void 0);
QuesAnswerComponent = __decorate([
    core_1.Component({
        templateUrl: '/app/admin/quesanswer/addques.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, index_1.QuesAnsService, index_1.FileService])
], QuesAnswerComponent);
exports.QuesAnswerComponent = QuesAnswerComponent;
//# sourceMappingURL=addques.component.js.map