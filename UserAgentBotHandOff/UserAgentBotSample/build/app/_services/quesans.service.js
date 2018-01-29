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
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
let QuesAnsService = class QuesAnsService {
    constructor(http) {
        this.http = http;
        // Creates header for post requests.  
        //this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    getAll() {
        return this.http.get('/api/managequestionanswer', this.jwt()).map((response) => response.json());
    }
    getById(id) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response) => response.json());
    }
    create(quesans) {
        return this.http.post('api/managequestionanswer/post', quesans, this.options).map((response) => response.json());
    }
    update(quesans) {
        return this.http.put('/api/users/' + quesans.QuesAnsId, quesans, this.jwt()).map((response) => response.json());
    }
    //delete(id: number) {
    //  return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    //}
    // private helper methods
    jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    }
    //constructor(private _http: Http) { }
    get(url) {
        return this.http.get(url)
            .map((response) => response.json());
        // .do(data => console.log("All: " + JSON.stringify(data)))
        //.catch(this.handleError);
    }
    post(url, model) {
        let body = JSON.stringify(model);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    put(url, id, model) {
        let body = JSON.stringify(model);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url + id, body, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    delete(url, id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(url + id, options)
            .map((response) => response.json())
            .catch(this.handleError);
    }
    handleError(error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    }
};
QuesAnsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuesAnsService);
exports.QuesAnsService = QuesAnsService;
//# sourceMappingURL=quesans.service.js.map