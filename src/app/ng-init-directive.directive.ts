import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appNgInitDirective]'
})
export class NgInitDirectiveDirective {

  

  @Output('appNgInitDirective') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    
    setTimeout(() => this.initEvent.emit(), 10);
    
  }
}
