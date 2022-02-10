import { Directive, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Directive({
    selector: '[buttonBusy]'
})
export class ButtonBusyDirective implements OnInit, AfterViewInit {

    @Input() set buttonBusy(isBusy: boolean) {
        this.refreshState(isBusy);
    }

    @Input() busyText: string;

    private _button: any;
    private _originalButtonInnerHtml: any;

    constructor(
        private _element: ElementRef,
    ) {
    }

    ngOnInit(): void {
        this._button = this._element.nativeElement;
    }

    ngAfterViewInit(): void {
        this._originalButtonInnerHtml = this._button.innerHTML;
    }

    refreshState(isBusy: boolean): void {
        if (!this._button) {
            return;
        }

        if (isBusy) {
            // disable button
            this._button.setAttribute('disabled', 'disabled');

            // <i class="fas fa-spinner fa-pulse"></i>
            
            this._button.innerHTML = '<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>' +
                '<span>' + this.busyText + '</span>';

            this._button.setAttribute('_disabledBefore', true);
        } else {
            if (!this._button.getAttribute('_disabledBefore')) {
                return;
            }

            // enable button
            this._button.removeAttribute('disabled');
            this._button.innerHTML = this._originalButtonInnerHtml;
        }
    }
}