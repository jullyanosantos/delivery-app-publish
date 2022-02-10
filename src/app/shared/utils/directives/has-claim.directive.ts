import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// import { AccountService } from 'src/app/shared/common/services-proxies/account.service';

@Directive({
   selector: '[appHasClaim]'
})
export class HasClaimDirective {

   constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef
    //   private accountService: AccountService
      )
    { }

    @Input() set appHasClaim(claimType: string) {
    //   if (this.accountService.hasClaim(claimType)) 
    //   {
    //     // Add template to DOM
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //   } else {
    //     // Remove template from DOM
    //     this.viewContainer.clear();
    //   }
    }
}