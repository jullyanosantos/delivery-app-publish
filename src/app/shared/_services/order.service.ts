import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PagedResult } from '../_models/paged-result';
import { Pedido } from '../_models/pedido';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Pedido[];

  constructor(
    private http: HttpClient) { }

  // getOrders(status: number) {
  //   return this.orders.filter(x => x.status == status);
  // }

  getOrders() {

    let url = `${environment.apiUrl}/orders`;

    return this.http.get<any>(url)
      .pipe(map(result => {
        debugger
        return result;
      }));
  }

  getAll(filter: string | null | undefined, status: number | null | undefined, pageNumber: number | null | undefined, pageSize: number | null | undefined, sortBy: string | null | undefined) {

    debugger
    let url = `${environment.apiUrl}/getOrdersPaginated?`;

    if (filter != undefined)
      url += "Filtro=" + encodeURIComponent("" + filter) + "&";
    if (pageNumber != undefined)
      url += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
    if (pageSize != undefined)
      url += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
    if (sortBy != undefined)
      url += "SortBy=" + encodeURIComponent("" + sortBy) + "&";
    if (status != undefined)
      url += "status=" + encodeURIComponent("" + status) + "&";

    url = url.replace(/[?&]$/, "");

    return this.http.get<PagedResult<Pedido>>(url)
      .pipe(map(result => {
        debugger
        return result;
      }));
  }

  getOrdersById(id: number) {

    let url = `${environment.apiUrl}/orders/` + id;

    return this.http.get<Pedido>(url)
      .pipe(map(result => {

        let pedido: Pedido;

        debugger
        if (result)
          pedido = result[0];

        return pedido;
      }));
  }

  getOrdersByStatus(status: number) {

    let url = `${environment.apiUrl}/orders/` + status;

    // url += "id=" + encodeURIComponent("" + status) + "&";

    // url = url.replace(/[?&]$/, "");

    return this.http.get<any>(url)
      .pipe(map(result => {

        debugger
        return result;
      }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  // getAllNewPedidos() {

  //   return this.orders.filter(x => x.status == 1);
  //   // return this.http.get<any>('app/shared/services/pedidos.json')
  //   //   .toPromise()
  //   //   .then(res => <Pedido[]>res.data)
  //   //   .then(data => {
  //   //     return data;
  //   //   });
  // }

  // getAllNInPreparing() {

  //   this.ordersInPreparing = this.orders.filter(x => x.status == 2);

  //   return this.ordersInPreparing;
  // }
}