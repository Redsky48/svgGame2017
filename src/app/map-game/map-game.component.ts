import { Component, OnInit, HostListener, ViewChildren, ElementRef, ViewChild, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { MessageService } from '../message.service';
import { DatabaseService } from '../database.service';
import TerrainGenerator, { mapObjectToArray } from "chunked-terrain-generator";

@Component({
  selector: 'app-map-game',
  templateUrl: './map-game.component.html',
  styleUrls: ['./map-game.component.css']
})
export class MapGameComponent implements OnInit {
////////////////////////publlics
public dialogs={
sector:false,
questDialog:false
};
public foot=100000;
public steps=0;
public viewpoint ={
  width:1900,
  height:900
  };
public playerStarts={};
  public worldMap = [];
  public world=[];
  public lastMovePossition = '';
  public player = {
    possition: {
      x: 280,
      y: 500,
      sectorName:''
    },
    size: {
      width: 40,
      height: 40,
    }
  };
  public Allhitboxes = [];
  public key;

///////////////////// events
  
@ViewChild('map') map: ElementRef[];







 
  @HostListener('document:keypress', ['$event'])

  async handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    let result = await this.CheckHitboxes();
   
    let counter=0;
    if (result.hitbox.type) {
      
      if (result.hitbox.type.value == 'Fight') {
       
        let probability=100 / result.hitbox.type.Probability;
       // let probability=2;
     

        let random = (Math.floor(Math.random() * probability));
        if(random==1){
          this.randomEncounter(result.hitbox.type);
          counter=1;
        }
        
      }
    }else{
      if(counter==1){
        this.sendMessage('');
      }
       counter=0;
      
    }

    this.KeyPressAndWorldPhizics(result);



  }



///////////LoadingHTML

  constructor(private messageService: MessageService,private database:DatabaseService){
this.viewpoint=this.database.viewpoint;
this.database.getJSON('maps', 'worldMap', true).then((result)=>{
  
  this.world=<any>result;
 
  this.hitboxGenerator();
})









  }
  sendMessage(Message): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(Message);
}
  clearMessage(): void {
      // clear message
      this.messageService.clearMessage();
  }
 async ngOnInit() {
    setTimeout(() => {
      this.worldMap = this.map;
      //console.log(this.worldMap)
     
      
    }, 300);
    //console.log(this.Allhitboxes);
    await this.database.generateNewPlayer();
    this.playerStarts= this.database.playerStarts;
   // console.log(this.playerStarts);




  }




///////////////////////////////functions


  async KeyPressAndWorldPhizics(result?) {
    this.steps++;
    if(this.steps >40 ){
      
      this.steps=0;
    }
    //this.ProcidualGenerationMapUpdate();
   
 //  console.log(this.player.possition)
  //  console.log(result);
   // console.log(this.foot)
if(this.key=='k'){
  console.log(this.Allhitboxes)
  console.log(this.player.possition)
 // this.randomEncounter(result.hitbox.type);
}


    let PlayerHeight = this.player.size.height;

    let walkThro = result['hitbox']['walkThro'];

   // console.log(this.key);
    if ((this.key == 'w' || this.key == 'W') ) {
      this.foot++;
      if (walkThro) {
        this.lastMovePossition = 'w';
      }

      if (this.key == 'W') {
        this.player.possition.y -= (PlayerHeight / 2);
        this.key = 'w';
        let result2 = this.CheckHitboxes();
        
        if (result2['hitbox']['walkThro']) {
          return;
        }
        this.player.possition.y += (PlayerHeight / 2);

      }
      this.player.possition.y -= (PlayerHeight / 4);
      let result2 = this.CheckHitboxes();
      if (result2['hitbox']['walkThro']) {
        return;
      }
      this.player.possition.y += (PlayerHeight / 4);
    }
    if ((this.key == 's' || this.key == 'S') ) {
      this.foot--;
      if (walkThro) {
        this.lastMovePossition = 's';
      }

      if (this.key == 'S') {
        this.player.possition.y += (PlayerHeight / 2);
        this.key = 's';
        let result2 = this.CheckHitboxes();
        if (result2['hitbox']['walkThro']) {
          return;
        }
        this.player.possition.y -= (PlayerHeight / 2);

      }
      this.player.possition.y += (PlayerHeight / 4);
      let result2 = this.CheckHitboxes();
      if (result2['hitbox']['walkThro']) {
        return;
      }
      this.player.possition.y -= (PlayerHeight / 4);
    }
    if ((this.key == 'a' || this.key == 'A')) {
      this.foot++;
      if (walkThro) {
        this.lastMovePossition = 'a';
      }

      if (this.key == 'A') {
        this.player.possition.x -= (PlayerHeight / 2);
        this.key = 'a';
        let result2 = this.CheckHitboxes();
        if (result2['hitbox']['walkThro']) {
          return;
        }
        this.player.possition.x += (PlayerHeight / 2);

      }
      this.player.possition.x -= (PlayerHeight / 4);
      let result2 = this.CheckHitboxes();
      if (result2['hitbox']['walkThro']) {
        return;
      }
      this.player.possition.x += (PlayerHeight / 4);
    }
    if ((this.key == 'd' || this.key == 'D') ) {
      this.foot--;
      if (walkThro) {
        this.lastMovePossition = 'd';
      }

      if (this.key == 'D') {
        this.player.possition.x += (PlayerHeight / 2);
        this.key = 'd';
        let result2 = this.CheckHitboxes();
        if (result2['hitbox']['walkThro']) {
          return;
        }
        this.player.possition.x -= (PlayerHeight / 2);

      }
      this.player.possition.x += (PlayerHeight / 4);
      let result2 = this.CheckHitboxes();
      if (result2['hitbox']['walkThro']) {
        return;
      }
      this.player.possition.x -= (PlayerHeight / 4);
    }
  }


 
  CheckHitboxes() {

    let PlayerWidth = this.player.size.width;
    let PlayerHeight = this.player.size.height;


    let PLL = this.player.possition.x; //Left <---
    let PUL = this.player.possition.y; //Up
    let PRL = PLL + PlayerWidth;         //Right -->
    let PDL = PUL + PlayerHeight;        //Down 
    for(let sector of this.world){
     // console.log(this.world)
    if(this.player.possition.x >sector.x && this.player.possition.x < (sector.x+1200) && this.player.possition.y >sector.y && this.player.possition.y < (sector.y+1200)){
   
   if(this.player.possition.sectorName!=sector.name){
    this.player.possition.sectorName=sector.name;
   // console.log(sector.name)
    this.dialogs.sector=true;
    setTimeout(()=>{
      this.dialogs.sector=false
    },6000)
   }
      
    }
  }
    
    for (let hitbox of this.Allhitboxes) {
      let HW = hitbox.x + hitbox.width;
      let HH = hitbox.y + hitbox.height;

      if ((PRL >= hitbox.x && PLL <= HW) && (PDL >= hitbox.y && PUL <= HH)) {
       
        return { hitbox };
      }






    }
    return {
      hitbox: { walkThro: true }

    };
  }






  hitboxGenerator() {
    let hitboxPrep;




    for(let sector of this.world){
 // console.log(this.world)
if(this.player.possition.x >sector.x && this.player.possition.x < (sector.x+1200) && this.player.possition.y >sector.y && this.player.possition.y < (sector.y+1200)){
//console.log(sector.name)
}
let parentX = sector.x,
    parentY = sector.y;
      for(let collon of sector.bottom){
        for(let box of collon){
          
          let hitboxOfElement = box.value.hitbox
        //  console.log(hitboxOfElement)
        //  console.log('seit')
            
              let walkThro = hitboxOfElement['walkThro'];
    
              let x = hitboxOfElement.x;
              let y = hitboxOfElement.y;
              
              hitboxPrep = {
                height: parseInt(hitboxOfElement.height, 10),
                width: parseInt(hitboxOfElement.width, 10),
                x: parseInt(x+parentX, 10),
                y: parseInt(y+parentY, 10),
                walkThro: walkThro,
                type:hitboxOfElement.type,
                
              };
            
              this.Allhitboxes.push(hitboxPrep);

        }
      }
            for(let collon of sector.top){
        for(let box of collon){
        if(box.value.hitbox) { 
          let hitboxOfElement = box.value.hitbox
        // console.log(hitboxOfElement)
        //  console.log('seit')
            
              let walkThro = hitboxOfElement['walkThro'];
    
              let x = hitboxOfElement.x;
              let y = hitboxOfElement.y;
              
              hitboxPrep = {
                height: parseInt(hitboxOfElement.height, 10),
                width: parseInt(hitboxOfElement.width, 10),
                x: parseInt(x+parentX, 10),
                y: parseInt(y+parentY, 10),
                walkThro: walkThro,
                type:hitboxOfElement.type,
                
              };
            
              this.Allhitboxes.push(hitboxPrep);
}
        }
      }
    }
   // console.log('te')
    // console.log(this.Allhitboxes)
  }




  randomEncounter(parametres) {
   
    this.database.generateEnemies(parametres);
    this.sendMessage(parametres);
    
}




}
