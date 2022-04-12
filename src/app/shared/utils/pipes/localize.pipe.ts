import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'localize'
})
export class LocalizePipe implements PipeTransform {

    constructor(injector: Injector) {

    }

    l(key: string, ...args: any[]): string {
        args.unshift(key);
        // args.unshift(this.localizationSourceName);
        return this.ls.apply(this, args);
    }

    ls(sourcename: string, key: string, ...args: any[]): string {
        let localizedText = key;//this.localization.localize(key, this.localizationSourceName);
        
        if (!localizedText || localizedText == key) 
            localizedText = key;// this.localization.localize(key, this.localizationSourceNameEaf);

        args.unshift(localizedText);

        // return ebs.utils.formatString.apply(this, args);
        return "";
    }
    
    transform(key: string, ...args: any[]): string {
        return this.l(key, args);
    }
}