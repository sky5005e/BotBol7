import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    headers: Headers;
    options: RequestOptions;  
    constructor(private http: Http) {
        // Creates header for post requests.  
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });  
    }

    login(username: string, password: string) {
      //  var data = "grant_type=password&username=" + username + "&password=" + password;
        var data = "username=" + username + "&password=" + password;

        return this.http.post('/api/account/login', data, this.options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                //alert(user.access_token);
                //debugger;
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}