import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOrderSelector]'
})
export class OrderSelectorDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
