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
const file_service_1 = require("../_services/file.service");
let FileUploadComponent = class FileUploadComponent {
    constructor(fileService) {
        this.fileService = fileService;
        this.errors = [];
        this.dragAreaClass = 'dragarea';
        this.projectId = 0;
        this.sectionId = 0;
        this.fileExt = "JPG, GIF, PNG";
        this.maxFiles = 5;
        this.maxSize = 5; // 5MB
        this.uploadStatus = new core_1.EventEmitter();
    }
    ngOnInit() { }
    onFileChange(event) {
        let files = event.target.files;
        this.saveFiles(files);
    }
    onDragOver(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }
    onDragEnter(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }
    onDragEnd(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    onDrop(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        this.saveFiles(files);
    }
    saveFiles(files) {
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length > 0) {
            let formData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                projectId: this.projectId,
                sectionId: this.sectionId
            };
            this.fileService.upload(formData, parameters)
                .subscribe(success => {
                this.uploadStatus.emit(true);
                console.log(success);
            }, error => {
                this.uploadStatus.emit(true);
                this.errors.push(error.ExceptionMessage);
            });
        }
    }
    isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }
    isValidFileExtension(files) {
        // Make array of file extensions
        var extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim(); });
        for (var i = 0; i < files.length; i++) {
            // Get file extension
            var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            var exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push("Error (Extension): " + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }
    isValidFileSize(file) {
        var fileSizeinMB = file.size / (1024 * 1000);
        var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize)
            this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUploadComponent.prototype, "projectId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUploadComponent.prototype, "sectionId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUploadComponent.prototype, "fileExt", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUploadComponent.prototype, "maxFiles", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUploadComponent.prototype, "maxSize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "uploadStatus", void 0);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadComponent.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadComponent.prototype, "onDragEnter", null);
__decorate([
    core_1.HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadComponent.prototype, "onDragEnd", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploadComponent.prototype, "onDrop", null);
FileUploadComponent = __decorate([
    core_1.Component({
        selector: 'app-file-upload',
        templateUrl: '/app/_directives/fileupload.component.html'
    }),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileUploadComponent);
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=fileupload.component.js.map