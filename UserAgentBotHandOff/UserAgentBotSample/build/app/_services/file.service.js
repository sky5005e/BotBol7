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
const http_1 = require("@angular/http");
const Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
const global_1 = require("../_shared/global");
let FileService = class FileService {
    // = 'http://localhost:xxxx/api/fileupload/'
    constructor(http) {
        this.http = http;
        this._baseURL = global_1.Global.BASE_QAS_ENDPOINT; //+ '/post/'
    }
    upload(files, parameters) {
        let headers = new http_1.Headers(); //{'Content-Type': undefined } );
        let options = new http_1.RequestOptions({ headers: headers });
        options.params = parameters;
        return this.http.post(this._baseURL + '/post', files, options)
            .map(response => response.json())
            .catch(error => Rx_1.Observable.throw(error));
    }
    getImages() {
        return this.http.get(this._baseURL + "getimages")
            .map(response => response.json())
            .catch(error => Rx_1.Observable.throw(error));
    }
};
FileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map