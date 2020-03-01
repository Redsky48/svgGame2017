import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.css']
})
export class CharacterCreatorComponent implements OnInit {
  public Object = Object;
  public userdesign = {};
  public designs ={};
  public selected = {
    class: 1,
    hat: 1,
    hair: 1,
 
    beard: 1,
    skin: 99,
    shoes: 1,
    hairStyle:1,
    head:89,
    eyebrow:1,
    ear:83,
    eyewhite:26,
    foot:47
  }
  public classes = {};
  public CreatorSettings = [
    { id: 'class', value: 3 },
    { id: 'eyewhite', value: 14 },
    { id: 'skin', value: 147 },
    { id: 'body', value: 3 },
    { id: 'foot', value: 147 },
    { id: 'hairStyle', value: 147 }
  ]
  public colors = {}
  constructor(private database: DatabaseService, private http: Http) {
    //this.userdesign = this.database.getJSON('userdesign', 'avatarsData');
    this.colors=this.database.colors;
  }












  async ngOnInit() {
    this.database.getHighestStats();
    this.classes = this.database.classes;
    //console.log(this.classes);
    this.userdesign = await this.database.getJSON('charCreator', 'avatarsData');
    this.designs = await this.database.getJSON('charCreator', 'designs');
    console.log( this.designs)
    this.creatorSettingsBoost();
    //console.log(this.database.userdesign)
  }

  // co(){
  //   let a={ }
  //   let counter=0;
  //   for(let color of Object.keys(this.colors)){
  //  a[counter]=this.colors[color];
  //  counter++;
  //   }
  //   console.log(JSON.stringify(a))
  // }

  doSomething(task, element?, element2?) {
    if (task == 'changeAttribute') {
      // console.log(element)
      this.selected[element.id] += element2;
      if (this.selected[element.id] > element.value) {
        this.selected[element.id] = 1;
      }
      if (this.selected[element.id] < 1) {
        this.selected[element.id] = element.value;
      }
     // console.log(element.id);
      console.log(this.selected);

    }
    if (task == 'next') {
      this.database.Usercharacter.push(JSON.parse(JSON.stringify(this.selected)));
      console.log(this.database.Usercharacter)
      this.database.sendMessage('CharSelected');
    }
  }

  randomColorGenerator(element) {
    let r = Math.floor(Math.random() * 255),
      g = Math.floor(Math.random() * 255),
      b = Math.floor(Math.random() * 255);

    this.selected[element.id] = 'rgb(' + r + ',' + g + ',' + b + ')';
  }


  creatorSettingsBoost() {

    for (let design of Object.keys(this.userdesign)) {
      this.CreatorSettings

      if (!this.CreatorSettings[design] && design!='beard') {
        let som = { id: design, value: this.userdesign[design].shapes.length };
        this.selected[design] = 0;
        this.CreatorSettings.push(som);
        
      }
      if(design!='beard'){
        this.CreatorSettings[design]= this.userdesign[design].shapes.length;
       // console.log(design +' = '+ this.CreatorSettings[design])
      }
        
      
      

    }
    //console.log(this.CreatorSettings)





    for (let parametreKey of Object.keys(this.userdesign)) {
      if (parametreKey == 'hair') {
        for (let position of Object.keys(this.userdesign[parametreKey].shapes[this.selected[parametreKey]])) {
          for (let object of this.userdesign[parametreKey].shapes[this.selected[parametreKey]][position]) {
            if (!object['hideoncanvas']) {
  
             // console.log(object.path)
            }
          }         
        }
      }
    }
  }


  
}