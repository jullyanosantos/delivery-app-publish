import { Injector } from '@angular/core';
import { ToastrNotifyService } from '../../assets/lib/service-base/tostr-notify/tostr-notify.service';
import { AlertService } from '../../assets/lib/service-base/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { SweetAlertService } from './componentes/sweet-alert/sweet-alert-service';

export abstract class AppComponentBase {

    tostrNotify: ToastrNotifyService;
    translateService: TranslateService;
    alertService: AlertService;
    sweetAlertService: SweetAlertService;
    
    constructor(injector: Injector) {

        this.tostrNotify = injector.get(ToastrNotifyService);
        this.translateService = injector.get(TranslateService);
        this.alertService = injector.get(AlertService);
        this.sweetAlertService = injector.get(SweetAlertService);
    }
}