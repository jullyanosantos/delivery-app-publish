import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from '././directives/auto-focus.directive';
import { BusyIfDirective } from '././directives/busy-if.directive';
import { ButtonBusyDirective } from '././directives/button-busy.directive'
import {LocalizePipe } from './pipes/localize.pipe'
@NgModule({
    imports: [
        CommonModule
    ],
    providers: [],
    declarations: [
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        LocalizePipe
    ],
    exports: [
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        LocalizePipe
    ]
})
export class UtilsModule { }