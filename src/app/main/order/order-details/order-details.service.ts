import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from 'src/app/shared/_models/pedido';

@Injectable({
    providedIn: 'root'
})
export class OrderDetaisService {

    private sidebarOrderDetailState = 'false';
    private sidebarOrderDetailStateChanged$ = new BehaviorSubject<string>(this.sidebarOrderDetailState);
    public sidebarStateOrderDetailObservable$ = this.sidebarOrderDetailStateChanged$.asObservable();

    public pedidoObservable: Pedido = null;
    private pedidoObservableChanged$ = new BehaviorSubject<Pedido>(this.pedidoObservable);
    public pedidoObservableChanged$Observable$ = this.pedidoObservableChanged$.asObservable();
    constructor(

    ) {
        this.close();
    }

    showOrderDetails(pedido: Pedido) {
        this.pedidoObservable = pedido;
        this.pedidoObservableChanged$.next(this.pedidoObservable);

        this.open();
    }

    toggle() {
        this.sidebarOrderDetailState = this.sidebarOrderDetailState === 'open' ? 'close' : 'open';
        this.sidebarOrderDetailStateChanged$.next(this.sidebarOrderDetailState);
    }

    close() {
        this.sidebarOrderDetailState = 'close';
        this.sidebarOrderDetailStateChanged$.next(this.sidebarOrderDetailState);
    }

    open() {
        this.sidebarOrderDetailState = 'open';
        this.sidebarOrderDetailStateChanged$.next(this.sidebarOrderDetailState);
    }

    getIdObservable() {
        return this.pedidoObservableChanged$;
    }
}