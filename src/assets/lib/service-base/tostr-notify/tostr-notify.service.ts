import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ActiveToast } from 'ngx-toastr';

@Injectable()
export class ToastrNotifyService {

    options: IndividualConfig;

    constructor(
        private toastr: ToastrService
    ) {
        this.options = this.toastr.toastrConfig;
        this.options.positionClass = 'toast-top-right';
        this.options.timeOut = 5000;
        this.options.closeButton = true;
        this.options.enableHtml = true;
        this.options.progressBar = true;
        this.options.progressAnimation = "decreasing";
    }

    info(message?: string, title?: string) {

        title = title == undefined ? "Info" : title;

        this.toastr.info(message, title, this.options);
    }

    success(message?: string, title?: string) {

        title = title == undefined ? "Aviso" : title;

        this.toastr.success(message, title, this.options);
    }

    warning(message?: string, title?: string) {

        title = title == undefined ? "Aviso" : title;

        this.toastr.warning(message, title, this.options);
    }

    error(message?: string, title?: string) {

        title = title == undefined ? "Erro" : title;

        this.toastr.error(message, title, this.options);
    }

    show(title?: string, message?: string, type?: string) {

        type = type == undefined ? 'success' : type;

        var typeTitle = type == "success" ? "Success" :
            type == "warning" ? "Warning" :
                type == "info" ? "Info" : "Error"

        title = title == undefined ? typeTitle : title;

        this.toastr.show(message, title, this.options, 'toast-' + type);
    }

    confirm(title?: string, message?: string, callback?: any) {

        title = title == undefined ? "Aviso" : title;

        var btnSim = "<button type='button' id='confirmationRevertYes' class='btn btn-success clear'>Sim</button>";
        var btnNao = "<button type='button' id='confirmationRevertNo' class='btn btn-danger clear'  style=\" margin-right: 19px;\">Não</button>";

        let options: IndividualConfig;
        options = this.toastr.toastrConfig;
        options.positionClass = 'toast-top-right';
        options.enableHtml = true;
        options.extendedTimeOut = 1500000;
        options.timeOut = 1500000;

        this.toastr.warning(message + "<br /><br />" + btnNao + btnSim, title, options)
            .onTap.subscribe(() => callback());
    }

    public progressToast(message: string, title: string, progressFn: () => number): ActiveToast<any> {
        let toast: ActiveToast<any> = this.toastr.info(message, title, {
            'extendedTimeOut': 1500000,
            'timeOut': 1500000, // we need to set a timeout otherwise ngx-toastr won't display the progressBar
            'enableHtml': true,
            'tapToDismiss': false,
            'progressBar': true,
            'progressAnimation': 'increasing'
        });

        // A bit "hacky", the ngx-toastr progress bar only works with its own progress method, based on the specified timeout, and cannot be controlled manually
        // That's why we have to specify a big timeout in the options
        // We overload the default progress method to use the one we want, this way, we can have a manual control of the progress bar
        (<any>toast).toastRef.componentInstance.updateProgress = () => {
            (<any>toast).toastRef.componentInstance.width = progressFn();
        };
        return toast;
    }
}