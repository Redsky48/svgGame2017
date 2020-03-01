import { Component, OnInit, ElementRef, ViewChild, ViewChildren, HostBinding, Input } from '@angular/core';
import { Power1, Bounce } from 'gsap/all';
import { isNumber } from 'util';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';
import { DatabaseService } from '../database.service';
import { IfStmt } from '@angular/compiler';
declare var TweenMax: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

public PosAnimations={
  run:{
    rlegAnim:[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,5,0],
    rleg:0
  }
}



  @Input() battle: any[];



  @ViewChild('damage') damage: ElementRef;
  @ViewChild('player') playerHTML: ElementRef;
  @ViewChildren('enem') enemy: ElementRef;

  public DamageColors = {
    hp: '#1d9128',
    mp: '#1d1da3',
    ice: '#1c88a2',
    fire: '#ff2e23',
    water: '#459ff9',
    dark: '#2d0933',
    earth: '#441c0b',
    electricity: '#ccb614',
    light: '#fffad3'

  }

  public colors={}

  public drawing = {
    top: "",
    back: ''
  }
  public desining=false;
  public playerDesign = {};
  public userSkelet = {};
  public playerTurn = true;
  public Object = Object;
  public enemySelected = 0;
  public enemySelected2 = 0.5;
  public howerAttack = {
    i2: -1,
    i: -1
  };
  public userCharacter = {

    TAKINGDAMAGE: {
      1: '',
      2: ''
    },

    class: '',
    LVL: 0,
    HP: 0,
    MP: 0,

    MAXHP: 0,
    MAXMP: 0,

    ATK: 0,
    DEF: 0,

    MPRESTORE: 0,


    ATTACKS: []
  }

  public enemyCharacters: any = []

  message: any;
  subscription: Subscription;
  constructor(private messageService: MessageService, private database: DatabaseService) {

    setInterval(()=>{
      this.animateUser()
    },1000)
 

    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      //console.log(message);
      this.drawUser();
    });
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
    //console.log(this.battle)
    this.enemyCharacters = this.database.generatedEnemies;
    this.userCharacter = this.database.playerStarts;
    this.playerDesign = this.database.Usercharacter;
    this.colors=this.database.colors;
    this.userSkelet = await this.database.getJSON('charCreator', 'userPlayerSkellet');
    this.colorUser();
    this.drawUser();

    console.log(this.userSkelet)
    console.log(this.playerDesign)
  }
  doSomething(task, element, element2) {
    //console.log(task);
    //console.log(this.enemySelected);
    //console.log(this.enemySelected2);
    if (task == 'attack' && this.playerTurn) {
      // console.log(this.userCharacter.ATTACKS);
      if (element.MP > this.userCharacter.MP) {
        return;
      } else {
        this.userCharacter.MP -= element.MP;
      }

      this.playerTurn = false;
      //console.log(element)
      if (element.type == 'potions') {

        this.userCharacter.HP += element.HP;
        this.userCharacter.MP += element.MP;

        let HP = JSON.stringify(element.HP),
          MP = JSON.stringify(element.MP);
        if (element.HP > 0 && element.MP > 0) {
          //check what to show
          this.userCharacter.TAKINGDAMAGE["1"] = 'Healing ' + HP;
          this.userCharacter.TAKINGDAMAGE["2"] = 'hp'
          setTimeout(() => {
            this.userCharacter.TAKINGDAMAGE["1"] = 'Restoring MP ' + MP;
            this.userCharacter.TAKINGDAMAGE["2"] = 'mp'
          }, 2000);
        } else {
          if (element.MP != 0) {
            this.userCharacter.TAKINGDAMAGE["1"] = 'Restoring MP ' + MP;
            this.userCharacter.TAKINGDAMAGE["2"] = 'mp'
          } else {
            this.userCharacter.TAKINGDAMAGE["1"] = 'Healing ' + HP;
            this.userCharacter.TAKINGDAMAGE["2"] = 'hp'

          }
        }

        // console.log(this.userCharacter)


      } else {
        TweenMax.to(this.playerHTML.nativeElement, 0.1, { x: 300, repeat: 1, yoyo: true, repeatDelay: 0.5, ease: Power1.easeNone });



        this.NullDamage();

        let damageDealth = ((Math.floor(Math.random() * element.DMG / 1.5) + (element.DMG / 2) * this.userCharacter.ATK) / this.enemyCharacters[this.enemySelected].DEF);
        // console.log(this.enemyCharacters[this.enemySelected].DEF)
        this.enemyCharacters[this.enemySelected].HP -= damageDealth;



        if (damageDealth > ((element.DMG * this.userCharacter.ATK) / this.enemyCharacters[this.enemySelected].DEF)) {
          this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["1"] = 'Critical Hit ' + damageDealth;
          this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["2"] = element.type;
        } else {
          this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["1"] = '' + damageDealth;
          this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["2"] = element.type;
        }

      }

      setTimeout(() => {

        this.NullDamage();


        if (this.enemyCharacters[this.enemySelected].HP < 1) {
          this.enemyCharacters.splice(this.enemySelected, 1)
          this.enemySelected = 0;
        }

        setTimeout(() => {
          this.enemyMove();
          if (!this.enemyCharacters && this.enemyCharacters.length < 1) {
            this.sendMessage({ value: 'Win' });
          }
        }, 1000);

      }, 1000);


    }

    if (task == 'animate') {

      TweenMax.fromTo(this.damage.nativeElement, 1, { y: -4 }, { y: -58, ease: Power1.easeOut });

    }

    if (task == 'hover') {
      this.howerAttack = {
        i2: element,
        i: element2,
      };
    }
    if (task == "hoverOnEnemy") {
      this.enemySelected2 = element;
    }

    if(task=="add"){
      this.playerDesign[0][element] +=element2;
      this.change()
console.log(this.playerDesign[0][element])
    }

  }


  enemyMove() {
    if (!this.playerTurn) {
      let attackTimes = 0;

      let enemyWhoWillAttack = 0;

      for (let i = 0; i < this.enemyCharacters.length; i++) {

        setTimeout(() => {
          this.enemyAttack(i);
          // console.log('enemyattack = '+i)



        }, 1800 * (enemyWhoWillAttack + 1));
        enemyWhoWillAttack++;

      }
      setTimeout(() => {
        if (this.userCharacter.HP <= 0) {
          this.playerTurn = false;

          this.sendMessage({ value: 'Lose' });



        } else {
          this.playerTurn = true;
        }


        this.userCharacter.MP += this.userCharacter.MPRESTORE;


      }, 1800 * (enemyWhoWillAttack + 1));

    }

  }

  enemyAttack(enemy1) {
    for (let i = 0; i < this.enemyCharacters.length; i++) {
      let enemy: any = this.enemyCharacters[i];
      if (enemy.HP > 0 && enemy1 == i) {

        this.NullDamage();




        let randomWeapon = Math.floor(Math.random() * enemy.ATTACKS.length);
        let damageDealth = (Math.floor(Math.random() * enemy.ATTACKS[randomWeapon].DMG / 1.5) + (enemy.ATTACKS[randomWeapon].DMG / 2) * enemy.ATK) / this.userCharacter.DEF;
        if (damageDealth > 0) {
          TweenMax.to(this.enemy['_results'][enemy1].nativeElement, 0.1, { x: -53, repeat: 1, yoyo: true, repeatDelay: 0.5, ease: Power1.easeNone });
        }
        if (enemy.ATTACKS[randomWeapon].HP > 0) {
          enemy.TAKINGDAMAGE["1"] = 'Healing ' + enemy.ATTACKS[randomWeapon].HP;
          enemy.TAKINGDAMAGE["2"] = 'hp';

          enemy.HP += enemy.ATTACKS[randomWeapon].HP;
        }


        console.log(enemy.ATTACKS[randomWeapon]);

        if (damageDealth > (enemy.ATTACKS[randomWeapon].DMG * enemy.ATK) / this.userCharacter.DEF) {
          this.userCharacter.TAKINGDAMAGE["1"] = 'Critical Hit ' + damageDealth;
          this.userCharacter.TAKINGDAMAGE["2"] = enemy.ATTACKS[randomWeapon].type;
        } else {
          this.userCharacter.TAKINGDAMAGE["1"] = '' + damageDealth;
          this.userCharacter.TAKINGDAMAGE["2"] = enemy.ATTACKS[randomWeapon].type;
        }
        this.userCharacter.HP -= damageDealth
        if (this.userCharacter.HP <= 0) {
          this.userCharacter.HP = 0;
        }

        setTimeout(() => {

          this.NullDamage();
          enemy.TAKINGDAMAGE["1"] = '';
          enemy.TAKINGDAMAGE["2"] = '';
        }, 1000);
      }

    }
  }




  NullDamage() {
    this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["1"] = '';
    this.userCharacter.TAKINGDAMAGE["1"] = '';
    this.enemyCharacters[this.enemySelected].TAKINGDAMAGE["2"] = '';
    this.userCharacter.TAKINGDAMAGE["2"] = '';
  }



async change(){
  console.log('changed')
 await this.colorUser()
 await this.drawUser()
}


  drawUser() {
    for (let postiton of Object.keys(this.userSkelet)) {
      this.drawing[postiton] = '<g id="' + postiton + '" >';
      for (let bodyplace of this.userSkelet[postiton]) {
        let opened = 0;
        for (let i = 0, ii = bodyplace.data.length; i < ii; i++) {
          let bodypart = bodyplace.data[i];
          let transform = '';
          if (bodypart['encor']) {
            if(bodypart.parent=='thight'){
              transform = ' transform="rotate(' + this.PosAnimations.run.rleg + ' ' + bodypart['encor']['x'] + ' ' + bodypart['encor']['y'] + ')"';
              //console.log(this.PosAnimations.run.rleg)
            }else{
              transform = ' transform="rotate(' + bodypart['encor']['angle'] + ' ' + bodypart['encor']['x'] + ' ' + bodypart['encor']['y'] + ')"';

            }
          }
          this.drawing[postiton] += '<g id="' + bodypart['id'] + '" ' + transform + ' >';
          this.drawing[postiton] += '<' + bodypart['type'];
          for (let key of this.Object.keys(bodypart)) {
            this.drawing[postiton] += ' ' + key + '="' + bodypart[key] + '"';
          }
          this.drawing[postiton] += ' />';
          if ((i + 1) < ii && bodyplace.data[i + 1].parent == bodypart.id) {  //tas bija no mana mini koda
            opened++;
          } else {
            this.drawing[postiton] += "</g>";
          }
        }
        for (let i = 0; i < opened; i++) {
          this.drawing[postiton] += "</g>";
        }
      }
      this.drawing[postiton] += '</g>';
      
    }
    //console.log("drawed")
    
  }


  colorUser() {
    for (let postiton of Object.keys(this.userSkelet)) {
      for (let bodyplace of this.userSkelet[postiton]) {
        for (let i = 0, ii = bodyplace.data.length; i < ii; i++) {
          let bodypart = bodyplace.data[i];
          if (!bodypart['fill']) {
            
            bodypart['fill'] = "";
          }
          
          if(bodypart.id=='neck' || bodypart.id=='sholder' || bodypart.id=='biceps' || bodypart.id=='elbow' || bodypart.id=='palm'|| bodypart.id=='thight'|| bodypart.id=='leg'|| bodypart.id=='body' || bodypart.id=="head"){
            bodypart['fill'] = this.colors[this.playerDesign[0]['skin']]
          }else{
            bodypart['fill'] = this.colors[this.playerDesign[0][bodypart.id]]
          }
          
        }

      }

    }
   // console.log("colored")
  }


  async animateUser(){
    let anim =this.PosAnimations.run.rlegAnim
    let timeouts=[]
    for(let i=0;i< anim.length; i++){
      timeouts.push(
        setTimeout(()=>{
          this.PosAnimations.run.rleg = anim[i]
          this.drawUser()
          if(i== anim.length-1){
            //console.log('animationFinished')
            
            for (var i2=0; i2<timeouts.length; i2++) {
              clearTimeout(timeouts[i2]);
            }
          }
        },10*i)
      )
      

    }
    
  }


}
