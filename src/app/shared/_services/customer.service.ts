import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { filter, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    private uriPrefix = 'assets/data/repositories/';
    private uriSuffix = '.json';

    constructor(
        private http: HttpClient) { }

    public getCustomers(): Promise<any> {
        var object = this.http.get<any>(this.uriPrefix + "customers" + this.uriSuffix).toPromise();

        return object;
    }

    public getCustomersFilter(term): Observable<any[]> {

        var url = this.uriPrefix + "customers" + this.uriSuffix;

        return this.http.get<any>(url)
            .pipe(map(res => {
                return res.data.filter(x => x.nome.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1)
            }));
    }
}