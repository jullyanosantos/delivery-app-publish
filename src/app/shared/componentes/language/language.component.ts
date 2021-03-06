import { Component, OnInit } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  items = [
    // { id: 1, value: "pt-br", name: 'FLAG_BRAZIL', image: 'brazil.png' },
    // { id: 2, value: "en", name: 'FLAG_ENGLISH', image: 'usa.png' }
  ];

  selectedLanguage: any;

  constructor(private languageService: LanguageService) {

    this.items = this.languageService.getLanguages();

    this.selectedLanguage = this.languageService.getLanguage();
  }

  ngOnInit(): void {
  }

  changeLanguage(item) {

    this.selectedLanguage = item;
    var changed = this.languageService.changeLanguage(item);

    if (changed)
      window.location.reload();
  }
}
