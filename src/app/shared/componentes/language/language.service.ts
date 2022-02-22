import { EventEmitter, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    lang: string;

    items = [
        { id: 1, value: "pt-br", name: 'FLAG_BRAZIL', image: 'brazil.png' },
        { id: 2, value: "en", name: 'FLAG_ENGLISH', image: 'usa.png' }
    ];
    constructor(private translateService: TranslateService) { }

    getLanguage(): any {

        var lang = localStorage.getItem("language");

        if (!lang) {
            lang = JSON.stringify(this.items.filter(x => x.id == 1)[0]);
        }

        return JSON.parse(lang);
    }

    getLanguages(): any {
        return this.items;
    }

    changeLanguage(language: any): boolean {

        var languageInuUse = this.getLanguage();

        if (languageInuUse.id == language.id)
            return false;

        localStorage.setItem('language', JSON.stringify(language));

        this.translateService.use(language.value);

        return true;
    }
}