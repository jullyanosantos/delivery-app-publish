import { Component, Injector, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/shared/AppComponentBase';
import { Pedido } from 'src/app/shared/models/pedidos/pedido';
import { OrderService } from 'src/app/shared/_services/order.service';
import { OrderDetaisService } from '../order/order-details/order-details.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent extends AppComponentBase implements OnInit {

  orders: Pedido[] = [];
  isLoading = false;

  constructor(
    injector: Injector,
    private pedidoService: OrderService,
    private orderDetailsService: OrderDetaisService,

  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
    this.alertService.info("Página em construção...");
  }

  async init() {
    this.isLoading = true;
    this.pedidoService.getOrders()
      .pipe(first())
      .subscribe(
        data => {
          this.orders = data;
          this.isLoading = false;
        },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
        });
  }
}
