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
const index_1 = require("../_services/index");
const forms_1 = require("@angular/forms");
const ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
const enum_1 = require("../_shared/enum");
const global_1 = require("../_shared/global");
let UsersComponent = class UsersComponent {
    constructor(fb, _userService) {
        this.fb = fb;
        this._userService = _userService;
        this.indLoading = false;
        this.title = 'Search';
    }
    ngOnInit() {
        this.userFrm = this.fb.group({
            Id: [''],
            UserName: ['', forms_1.Validators.required],
            Channel: [''] //,
            //Gender: ['', Validators.required]
        });
        this.title = 'Search';
        this.LoadUsers();
    }
    LoadUsers() {
        this.indLoading = true;
        this._userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; }
        //,error => this.msg = <any>error
        );
    }
    addUser() {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    }
    editUser(id) {
        this.dbops = enum_1.DBOperation.update;
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
    deleteUser(id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }
    criteriaChange(value) {
        if (value != '[object Event]')
            this.listFilter = value;
    }
    onSubmit(formData) {
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._userService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value).subscribe(data => {
                    if (data == 1) {
                        this.msg = "Data successfully added.";
                        this.LoadUsers();
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
                this._userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(data => {
                    if (data == 1) {
                        this.msg = "Data successfully updated.";
                        this.LoadUsers();
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
                this._userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(data => {
                    if (data == 1) {
                        this.msg = "Data successfully deleted.";
                        this.LoadUsers();
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
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }
};
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], UsersComponent.prototype, "modal", void 0);
UsersComponent = __decorate([
    core_1.Component({
        templateUrl: '/app/user/user.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, index_1.UsersService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=user.component.js.map