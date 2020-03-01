import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'sanitaze'
})
export class SanitazePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

     transform(input, type='html') {
         switch(type){
             case 'html': {
                 return this.sanitizer.bypassSecurityTrustHtml(input);
             }
             case 'style': {
                 return this.sanitizer.bypassSecurityTrustStyle(input);
             }
             case 'url': {
                 return this.sanitizer.bypassSecurityTrustUrl(input);
             }
             case 'resource': {
                 return this.sanitizer.bypassSecurityTrustResourceUrl(input);
             }
             default: {
                 console.log("sanitizing for type " + type + " not implemented yet");
                 return input;
             }
         }
     }
  



}
