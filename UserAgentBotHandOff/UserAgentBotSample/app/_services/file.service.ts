import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Global } from '../_shared/global';

@Injectable()
export class FileService {
    _baseURL: string = Global.BASE_QAS_ENDPOINT;//+ '/post/'
    // = 'http://localhost:xxxx/api/fileupload/'
    constructor(private http: Http) { }

    upload(files, parameters) {
        let headers = new Headers();//{'Content-Type': undefined } );
        let options = new RequestOptions({ headers: headers });
        options.params = parameters;
        return this.http.post(this._baseURL + '/post', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
    getImages() {
        return this.http.get(this._baseURL + "getimages")
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
}