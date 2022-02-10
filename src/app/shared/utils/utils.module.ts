import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from '././directives/auto-focus.directive';
import { BusyIfDirective } from '././directives/busy-if.directive';
import { ButtonBusyDirective } from '././directives/button-busy.directive'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [],
    declarations: [
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective
    ],
    exports: [
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective
    ]
})
export class UtilsModule { }