import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/shared/AppComponentBase';
import { OrderService } from 'src/app/shared/_services/order.service';
import { OrderDetaisService } from '../order/order-details/order-details.service';
import { DataTableHelper } from '../../shared/_helpers/data-table-helper';
import { Table } from 'primeng/table/table';
import { Paginator } from "primeng/paginator/paginator";
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { PagedResult } from 'src/app/shared/_models/paged-result';
import { Pedido } from 'src/app/shared/_models/pedido';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent extends AppComponentBase implements OnInit {

  pagedResult: PagedResult<Pedido> = new PagedResult<Pedido>();
  dataTableHelperUsers: DataTableHelper = new DataTableHelper();
  @ViewChild('dataTableUsers', { static: true }) dataTableUsers: Table;
  @ViewChild('paginatorOrderHistory', { static: true }) paginatorOrderHistory: Paginator;

  isLoading = false;
  items: any[];

  filters: {
    filtro: string;
    status: any;
    sortBy: string;
  } = <any>{};

  constructor(
    injector: Injector,
    private pedidoService: OrderService

  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.getOrdersHistory(null);
    // this.alertService.info("Página em construção...");

    this.items = [
      { id: 1, name: 'NEW_ORDER' },
      { id: 2, name: 'PREPARING_HEADER' },
      { id: 3, name: 'IN_DELIVERY_HEADER' },
      { id: 4, name: 'DONE' }
    ];

    this.items.forEach(x => {
      this.translateService.get(x.name).subscribe(value => {
        x.name = value;
      });
    });
  }

  reloadPage(): void {
    this.paginatorOrderHistory.changePage(this.paginatorOrderHistory.getPage());
  }

  onClear($event: any) {
    this.filters.filtro = undefined;
    this.getOrdersHistory($event);
  }

  selectItem(id: string) {
    debugger
    this.filters.filtro = id;
    this.getOrdersHistory(null)
  }

  getOrdersHistory(event?: LazyLoadEvent) {

    debugger
    if (this.dataTableHelperUsers.shouldResetPaging(event)) {
      this.paginatorOrderHistory.changePage(0);
      return;
    }

    this.dataTableHelperUsers.showLoadingIndicator();

    var status = this.filters.status != undefined ? this.filters.status.id : undefined;

    this.pedidoService.getAll(
      this.filters.filtro,
      status,
      this.dataTableHelperUsers.getSkipCount(this.paginatorOrderHistory, event),
      this.dataTableHelperUsers.getMaxResultCount(this.paginatorOrderHistory, event),
      this.dataTableHelperUsers.getSorting(this.dataTableUsers)
    ).pipe(first())
      .subscribe(
        result => {
          this.pagedResult = result;
          this.dataTableHelperUsers.totalRecordsCount = result.totalItems;
          this.dataTableHelperUsers.records = result.list;
          this.dataTableHelperUsers.hideLoadingIndicator();
        },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
        });
  }
}
