import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { QuesAns } from '../_models/index';

@Injectable()
export class QuesAnsService {
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http) {
        // Creates header for post requests.  
        //this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getAll() {
        return this.http.get('/api/managequestionanswer', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(quesans: QuesAns) {
        return this.http.post('api/managequestionanswer/post', quesans, this.options).map((response: Response) => response.json());
    }

    update(quesans: QuesAns) {
        return this.http.put('/api/users/' + quesans.QuesAnsId, quesans, this.jwt()).map((response: Response) => response.json());
    }

    //delete(id: number) {
      //  return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    //}

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    //constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        return this.http.get(url)
            .map((response: Response) => <any>response.json())
        // .do(data => console.log("All: " + JSON.stringify(data)))
        //.catch(this.handleError);
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}