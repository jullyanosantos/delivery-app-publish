import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/shared/_models/pedido';
import { OrderDetaisService } from './order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  pedido: Pedido;
  statusPedido = 3;
  constructor(
    public sidebarOrderDetailsService: OrderDetaisService
  ) { }

  ngOnInit(): void {

  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  showDetails(pedido: Pedido) {
    this.pedido = pedido;
  }

  getBackgroundColorByStatus(status) {
    
    let color = '#3f51b5';

    switch (status) {
      case 1:
        color = "#3f51b5";
        break;
      case 2:
        color = "#ffc107";
        break;
      case 3:
        color = "#0dcaf0";
        break;
      case 4:
        color = "#198754";
        break;
    }
    return color;
  }
}