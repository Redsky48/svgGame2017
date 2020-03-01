import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { DatabaseService } from './database.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public editor=true;
doSomething(mode){
  if(mode=='mode'){
    if(this.editor){
      this.editor=false
      return
    }
    this.editor=true
  }
}
}
