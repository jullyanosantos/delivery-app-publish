import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/shared/componentes/board-kanban/board';
import { Column } from 'src/app/shared/componentes/board-kanban/column';
import { OrderService } from 'src/app/shared/_services/order.service';
import { AppComponentBase } from 'src/app/shared/AppComponentBase';
import { Injector } from '@angular/core';
import { OrderDetaisService } from '../order-details/order-details.service';
import * as moment from 'moment';
import { ConfigService } from 'src/app/shared/utils/config/config.service';
import { first } from 'rxjs/operators';
import { Pedido } from 'src/app/shared/_models/pedido';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent extends AppComponentBase implements OnInit {

  @ViewChild("OrderDetails") settingNav: any;

  pedidos: Pedido[] = [];
  pedidosEmAndamento: Pedido[] = [];
  pedidosEmEntrega: Pedido[] = [];
  pedidosFinalizados: Pedido[] = [];
  draggedPedido: Pedido;
  board: Board;
  isLoading = false;

  constructor(
    injector: Injector,
    private pedidoService: OrderService,
    private orderDetailsService: OrderDetaisService,

  ) {
    super(injector);
  }

  ngOnInit() {

    this.initBoard();
    // this.alertService.info("tete", { autoClose: true });
  }

  showOrderDetails(id: number) {

    this.isLoading = true;

    this.pedidoService.getOrdersById(id)
      .pipe(first())
      .subscribe(pedido => {

        this.orderDetailsService.showOrderDetails(pedido);
        this.isLoading = false;
      },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
        });
  }

  updateStatusOrder(obj: any) {

    obj.pedido.status = obj.status;
    this.initBoard();

    let msg = obj.status == 2 ? "ORDER_PREPARING_MSG" :
      obj.status == 3 ? "ORDER_DELIVERY_MSG" :
        "ORDER_DONE_MSG";

    this.translateService.get(msg).subscribe(value => {
      msg = value;
    });

    this.tostrNotify.success(msg);
  }

  async initBoard() {
    debugger

    console.log(moment());
    // // this.pedidos = this.pedidoService.getOrders(1);
    // this.pedidosEmAndamento = this.pedidoService.getOrders(2);
    // this.pedidosEmEntrega = this.pedidoService.getOrders(3);
    // this.pedidosFinalizados = this.pedidoService.getOrders(4);
    this.isLoading = true;

    this.pedidoService.getOrders()
      .pipe(first())
      .subscribe(
        data => {
          this.pedidos = data.filter(x => x.status == 1);
          this.pedidosEmAndamento = data.filter(x => x.status == 2);
          this.pedidosEmEntrega = data.filter(x => x.status == 3);
          this.pedidosFinalizados = data.filter(x => x.status == 4);

          this.board = new Board('ORDER_TRACKING_BOARD', [
            new Column(1, 'NEWS_ORDERS_HEADER', this.pedidos, 2, 'task-new', 'fa fa-list-alt'),
            new Column(2, 'PREPARING_HEADER', this.pedidosEmAndamento, 3, 'task-praparing', 'fas fa-hamburger'),
            new Column(3, 'IN_DELIVERY_HEADER', this.pedidosEmEntrega, 4, 'task-delivery', 'fa fa-motorcycle'),
            new Column(3, 'DONE_HEADER', this.pedidosFinalizados, 5, 'task-done', 'fa fa-thumbs-up'),
          ]);

          this.isLoading = false;
        },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
        });
  }

  dropp(event: any) {
    debugger
    if (event.pedido.previousContainer === event.pedido.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.pedido.previousContainer.data,
        event.pedido.container.data,
        event.pedido.previousIndex,
        event.pedido.currentIndex);

      var item = event.pedido.previousContainer.data[event.pedido.previousIndex] as Pedido;

      if (item && event.status < item.status)
        return;

      this.updateStatusOrder({ pedido: item, status: event.status });
    }
  }

  drop(event: CdkDragDrop<string[]>, status) {

    debugger

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      var item = event.previousContainer.data[event.previousIndex];
      this.updateStatusOrder(item);
    }
  }

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }
}