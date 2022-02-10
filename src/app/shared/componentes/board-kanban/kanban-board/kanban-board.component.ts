import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../board';
import { Column } from '../column';
import { PedidoService } from 'src/app/shared/_services/pedido.service';
import { OrderDetaisService } from 'src/app/main/order/order-details/order-details.service';
import { AppComponentBase } from 'src/app/shared/AppComponentBase';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent extends AppComponentBase implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    injector: Injector,
    private pedidoService: PedidoService,
    private orderDetailsService: OrderDetaisService) {
    super(injector);
  }

  isLoading = false;
  @Input() boardItems: Board | null = null;
  @Output() cdkDropListDropped = new EventEmitter<{ pedido: CdkDragDrop<string[]>, status: number }>();
  @Output() onClickDetailsEvent = new EventEmitter<string>();
  @Output() onClickUpdateStatusEvent = new EventEmitter<{ pedido: any, status: number }>();

  board: Board = new Board('Test Board', [
    new Column(1, 'Ideas', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column(2, 'Research', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column(3, 'Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column(4, 'Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  dropEvent(pedido: CdkDragDrop<string[]>, status: number) {
    debugger
    this.cdkDropListDropped.emit({ pedido, status });
  }

  showDetailsEvent(id: string): void {
    debugger
    this.onClickDetailsEvent.emit(id);
  }

  updateStatusEvent(pedido: any, status: number) {
    this.onClickUpdateStatusEvent.emit({ pedido, status });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}