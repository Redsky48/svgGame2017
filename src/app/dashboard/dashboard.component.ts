import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public battle =false;
  public battleParams;
  public characterSelected =false;
  
  message: any;
  subscription: Subscription;
  constructor(private messageService: MessageService,private database: DatabaseService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message; 
      this.battle=false;
      console.log(this.message)
      if(this.database.Usercharacter.length>0 && this.message.text=='CharSelected'){
        this.characterSelected=true;
      }
      if(this.message.text['value']=='Fight'){
       this.battleParams=message.text;
       this.battle=true;
       
       //this.database.generateEnemies(message.text);
       //console.log(this.battleParams=message.text)
      }
      
     });
   }
  

  ngOnInit() {
    if(this.database.Usercharacter.length>0){
      this.characterSelected=true;
    }
    
  }

}
