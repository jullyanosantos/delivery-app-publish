import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-search-user-autocomplete',
  templateUrl: './search-user-autocomplete.component.html',
  styleUrls: ['./search-user-autocomplete.component.css']
})
export class SearchUserAutocompleteComponent implements OnInit {

  @Input() isMult: boolean = false;
  @Output() searchBarChangeEmitter: any = new EventEmitter();
  @Output() onClearEmitter: any = new EventEmitter();

  selectedValue: any;
  customers: any[];
  filteredCustomers: any[];
  control: any;
  value: any;

  constructor(private userService: CustomerService) { }

  ngOnInit() {

    this.userService.getCustomers().then(customers => {
      this.customers = customers.data;
    });
  }

  filterCustomers(event) {
    setTimeout(() => {

      // let filtered: any[] = [];
      let query = event.query;

      // for (let i = 0; i < this.customers.length; i++) {
      //   let customer = this.customers[i];
      //   if (customer.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      //     filtered.push(customer);
      //   }
      // }
      this.userService.getCustomersFilter(query)
        .pipe(first()).subscribe(result => {
          this.filteredCustomers = result;
        });

    }, 500);
  }

  onClearEvent($event: any) {
    this.onClearEmitter.emit($event);
  }

  onSearchBarSelect($event: any) {
    if ($event.id != 0) {
      this.searchBarChangeEmitter.emit($event.id);
    }
  }
}