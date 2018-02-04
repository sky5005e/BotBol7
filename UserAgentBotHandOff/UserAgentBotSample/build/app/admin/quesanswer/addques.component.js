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
let QuesAnswerComponent = class QuesAnswerComponent {
    constructor(fb, _qaService) {
        this.fb = fb;
        this._qaService = _qaService;
        this.indLoading = false;
        this.title = 'Search';
    }
    ngOnInit() {
        this.qaFrm = this.fb.group({
            QuesAnsId: [''],
            QuestionDesc: ['', forms_1.Validators.required],
            AnswerDesc: ['', forms_1.Validators.required]
        });
        this.title = 'Search';
        this.LoadQAS();
    }
    LoadQAS() {
        this.indLoading = true;
        this._qaService.get(global_1.Global.BASE_QAS_ENDPOINT + '/get')
            .subscribe(quesanswers => { this.quesanswers = quesanswers; this.indLoading = false; console.log('data', quesanswers); }
        //,error => this.msg = <any>error
        );
    }
    add() {
        //debugger;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New";
        this.modalBtnTitle = "Add";
        this.qaFrm.reset();
        // this.modal.open();
    }
    edit(id) {
        //debugger;
        this.dbops = enum_1.DBOperation.update;
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
    delete(id) {
        this.dbops = enum_1.DBOperation.delete;
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
    criteriaChange(value) {
        if (value != '[object Event]')
            this.listFilter = value;
    }
    onSubmit(formData) {
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._qaService.post(global_1.Global.BASE_QAS_ENDPOINT + '/post', formData._value).subscribe(data => {
                    if (data == 1) {
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
                break;
            case enum_1.DBOperation.update:
                this._qaService.put(global_1.Global.BASE_USER_ENDPOINT + '/put', formData._value.Id, formData._value).subscribe(data => {
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
                this._qaService.delete(global_1.Global.BASE_USER_ENDPOINT + '/delete', formData._value.Id).subscribe(data => {
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
    __metadata("design:paramtypes", [forms_1.FormBuilder, index_1.QuesAnsService])
], QuesAnswerComponent);
exports.QuesAnswerComponent = QuesAnswerComponent;
//# sourceMappingURL=addques.component.js.map