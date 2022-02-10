import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

    constructor() { }

    info(message?: string, title?: string, isHtml?: boolean) {

        title = title == undefined ? "info" : title;

        this.show(message, title, 'error', isHtml);
    }

    success(message?: string, title?: string, isHtml?: boolean) {

        title = title == undefined ? "Aviso" : title;

        this.show(message, title, 'success', isHtml);
    }

    warning(message?: string, title?: string, isHtml?: boolean) {

        title = title == undefined ? "Aviso" : title;

        this.show(message, title, 'warning', isHtml);
    }

    error(message?: string, title?: string, isHtml?: boolean) {

        title = title == undefined ? "Erro" : title;

        this.show(message, title, 'error', isHtml);
    }

    confirm(callback?: any, message?: string, isHtml?: boolean) {

        var opts = opts || {};

        opts.title = "Confirma a ação?";
        opts.icon = "question";
        opts.showConfirmButton = true;
        opts.showCancelButton = true;

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        swal.fire(opts)
            .then((willDelete) => {

                if (willDelete.value) {

                    if (callback && typeof callback === "function") {
                        callback();
                    }
                }
            });
    }

    private show(message?: string, title?: string, type?: string, isHtml?: boolean) {

        type = type == undefined ? 'success' : type;

        var typeTitle = type.toLowerCase() == "success" ? "success" :
            type == "warning" ? "warning" :
                type == "info" ? "Info" : "error"

        title = title == undefined ? typeTitle : title;

        var opts = opts || {};
        opts.title = title;
        opts.icon = type;

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        swal.fire(opts);
    }
}