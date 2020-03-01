import { Component, OnInit, Compiler, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import TerrainGenerator, { mapObjectToArray } from "chunked-terrain-generator";
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { async } from 'rxjs/internal/scheduler/async';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})

export class MapBuilderComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;



  @Output()
  myEvent: EventEmitter<any>;
  public counter = 0;
  public downloadHref: any;
  public counter2 = 0;
  public daudzums = 1;

  public Object = Object;
  public textures = {
    selectedToApply: { name: "" },
    selected: 'plants',
    selectedLayer: "top",
    top: [],
    bottom: []
  }

  public selectedSector = '';
  public world = [

  ]

  public colors = {
    r: 0,
    g: 0,
    b: 0
  }
  public terrainGenerator;
  public mapSettings = {

    width: 1200,
    height: 1200,
    gridSize: 20,
    toDraw: [],
    toDraw2: [],
    toggle: 1,
    worldPrewSett: {
      width: 12000,
      height: 12000,
      gridSize: 1200,
      draw: []
    }
  }
  constructor(private _compiler: Compiler, private sanitizer: DomSanitizer, private database: DatabaseService) {
    this.myEvent = new EventEmitter();
    this.createGrid('sector');
    this.createGrid('worldMap');

    this.database.getJSON('textures', 'top').then((result) => {

      this.textures.top = <any>result;

      console.log(this.textures)
    })
  }

  ngOnInit() {


    //const noiseGen = new FastSimplexNoise({ random: rng })
  }



  createGrid(drawMap) {
    console.log(drawMap)
    if (drawMap == 'sector') {
      this.mapSettings.toDraw = [];
      this.mapSettings.toDraw2 = [];
      this._compiler.clearCache();
      this.counter = 0;
      this.counter2 = 0;
      let
        counter = 0,
        counter2 = 0,

        width = this.mapSettings.width;


      while (width > 0) {
        width -= this.mapSettings.gridSize;

        let height = this.mapSettings.height,
          element = []

        while (height > 0) {
          height -= this.mapSettings.gridSize;


          if (counter2 > (this.mapSettings.height / this.mapSettings.gridSize) - 1) {
            counter2 = 0;
          }

          let randomObject = this.randomColorGenerator(counter, counter2)
          let element2 = {
            collon: counter,
            block: counter2,
            x: height,
            y: width,
            fill: "white",
            number: JSON.parse(JSON.stringify(randomObject['number'])),
            active: false,
            value: {
              walkThro: true,
              x: 0,
              y: 0,
              type: false,
              width: 10,
              height: 10
            }
          }
          element.push(element2)
          // console.log(counter +' '+counter2)
          counter2++;
        }
        this.mapSettings.toDraw.push(JSON.parse(JSON.stringify(element)))
        this.mapSettings.toDraw2.push(JSON.parse(JSON.stringify(element)))
        counter++;

      }
    }
    if (drawMap == 'worldMap') {

      this.mapSettings.worldPrewSett.draw = [];
      this._compiler.clearCache();
      this.counter = 0;
      this.counter2 = 0;
      let counter3 = 0;
      let
        counter = 0,
        counter2 = 0,
        width = this.mapSettings.worldPrewSett.width;


      while (width > 0) {
        //console.log(width)
        width -= this.mapSettings.worldPrewSett.gridSize;

        let height = this.mapSettings.worldPrewSett.height,
          element = []

        while (height > 0) {
          height -= this.mapSettings.worldPrewSett.gridSize;


          if (counter2 > (this.mapSettings.worldPrewSett.height / this.mapSettings.worldPrewSett.gridSize) - 1) {
            counter2 = 0;
          }
          let element2 = {
            "name": "",
            "id": "",
            "x": height - (this.mapSettings.worldPrewSett.height / 2),
            "y": width - (this.mapSettings.worldPrewSett.width / 2),
            "layer": 1,
            "number": counter + '-' + counter2,
            fill: 'white',
            top: [],
            bottom: []
          }
          element.push(element2)
          // console.log(counter +' '+counter2)
          counter3++;
          counter2++;
        }
        this.mapSettings.worldPrewSett.draw.push(JSON.parse(JSON.stringify(element)))

        counter++;

      }
    }

    // console.log(this.mapSettings);
  }



  randomColorGenerator(collon, block) {
    // let procidualNumber = this.mapArray[collon][block];
    let procidualNumber = 1;
    //console.log(this.mapArray[collon][block])
    // console.log(this.counter)
    let random = Math.floor(Math.random() * procidualNumber);
    //let random= procidualNumber
    console.log(random)
    //  let r =random ,
    //   g =random,
    //   b =random;

    let r = 0,
      g = 0,
      b = 0;
    let randomRev = random * -1;
    if (procidualNumber >= 1 && procidualNumber < 80) {
      r = randomRev,
        g = randomRev,
        b = randomRev / 2;
    }
    if (procidualNumber > 80 && procidualNumber > 160) {
      r = randomRev,
        g = randomRev / 2,
        b = random;
    }
    if (procidualNumber > 160 && procidualNumber > 255) {
      r = randomRev / 2,
        g = random,
        b = randomRev;
    }





    return {
      fill: 'rgb(' + r + ',' + g + ',' + b + ')',
      number: procidualNumber
    }




  }



  async doSomething(task, event?, block?, i?, i2?) {
    if (task == "selectTexture") {
      event.preventDefault();
      event.style
      this.textures.selectedToApply = block
      console.log(block)
    }
    if (task == "applyTextureOnBlock") {
      event.preventDefault();
      console.log(block)
    }
    if (task == 'selectSector') {
      this.selectedSector = block.number;
      //block['fill']='red';
      // console.log(this.world)

      if (this.world.length > 0) {
        for (let sector of this.world) {

          if (sector.number == block.number) {
            console.log(sector)
            await this.screenBlockUpdate(block.number);
            return;
          }

        }
      }

      let newSector = {
        number: block.number,
        "name": "new",
        "id": "ID",
        "x": block.x,
        "y": block.y,
        "layer": 1,
        top: [],
        bottom: [],
        fill: 'green'
      }
      this.world.push(newSector)
      // this.mapSettings.worldPrewSett.draw[i][i2]=newSector;
      //console.log(this.mapSettings.worldPrewSett.draw[i][i2])
      await this.screenBlockUpdate(block.number);

      // console.log(this.mapSettings)
    }
    if (task == 'toggle') {
      this.mapSettings.toggle++
      return
    }
    if (task == 'download') {

      var theJSON = JSON.stringify(this.world);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadHref = uri;
      console.log(this.downloadHref)
      return
    }
    if (task == 'save') {

      let top = [],
        bottom = [];



      for (let collon of this.mapSettings.toDraw) {
        let allBlocks = [];
        for (let block of collon) {
          if (block['active']) {
            allBlocks.push(block);
          }
        }
        if (allBlocks.length > 0) {
          top.push(allBlocks);
        }
      }

      for (let collon of this.mapSettings.toDraw2) {
        let allBlocks = [];
        for (let block of collon) {
          if (block['active']) {
            allBlocks.push(block);
          }
        }
        if (allBlocks.length > 0) {
          bottom.push(allBlocks);
        }
      }
      //////////////////////////
      let sectorExist = false;
      for (let i = 0; i < this.world.length; i++) {
        // console.log(this.world)
        // console.log(this.selectedSector)
        if (this.world.length > 0) {
          if (this.world[i].number == this.selectedSector) {
            this.world[i].bottom = JSON.parse(JSON.stringify(bottom));
            this.world[i].top = JSON.parse(JSON.stringify(top));
            return
          }
        }
      }
      if (!sectorExist) {

        let map = {
          number: this.selectedSector,
          "name": "new",
          "id": "ID",
          "x": event.x,
          "y": event.y,
          "layer": 1,
          "top": top,
          "bottom": bottom
        }
        // console.log(map)

        this.world.push(JSON.parse(JSON.stringify(map)));
        return

      }



    }


    if (task == 'click' || task == 'mouseOver' || task == 'click2') {
      let parentX,
        parentY;
        let x=0,y=0;
      for (let i = 0; i < this.world.length; i++) {

        if (this.world[i].number == this.selectedSector) {
          if(task != 'mouseOver'){
            console.log(this.world[i])
          }
          
          parentX = this.world[i].x
          parentY = this.world[i].y
        }
      }

      if (task == 'click2') {

        block['fill'] = "green";
        block['active'] = true;
        console.log(block)
        
        if (this.textures.selectedToApply.name!='' && this.Object.keys(this.textures.selectedToApply).length>1) {
          block.value = JSON.parse(JSON.stringify(this.textures.selectedToApply))
          let hitbox=block['value']['hitbox'];
          hitbox.x =JSON.parse(JSON.stringify( block.x -(hitbox.width/4) ));
          hitbox.y =JSON.parse(JSON.stringify(block.y -(hitbox.height/4) ));
        }
        // block['value'].walkThro = false;
        // block['value'].width = 40;
        // block['value'].height = 40;
        // block['value'].x = block.x + parentX;
        // block['value'].y = block.y + parentY;

      }



      if (task == 'click') {
        block['fill'] = "red";
        block['active'] = true;
       
        if (this.textures.selectedToApply.name!='' && this.Object.keys(this.textures.selectedToApply).length>1) {
          block.value = JSON.parse(JSON.stringify(this.textures.selectedToApply))
          let hitbox=block['value']['hitbox'];
          hitbox.x =JSON.parse(JSON.stringify( block.x -(hitbox.width/4) ));
          hitbox.y =JSON.parse(JSON.stringify(block.y -(hitbox.height/4) ));
        }

      }

      if (task == 'mouseOver' && event.buttons == 1) {
        block['fill'] = "red";
        block['active'] = true;
        
        if (this.textures.selectedToApply.name!='' && this.Object.keys(this.textures.selectedToApply).length>1) {
          block.value = JSON.parse(JSON.stringify(this.textures.selectedToApply))
          let hitbox=block['value']['hitbox'];
          hitbox.x =JSON.parse(JSON.stringify( block.x -(hitbox.width/4) ));
          hitbox.y =JSON.parse(JSON.stringify(block.y -(hitbox.height/4) ));
        }
      }


      if (event.ctrlKey && (task == 'click' || task == 'mouseOver' || task == 'click2')) {
        block['fill'] = "white";
        block['active'] = false;
        block.value = {}
      }
if(task != 'mouseOver'){
      console.log(block)}
    }





  }



  onFileChange(event, class2) {
    this.selectedSector = '';
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      //  console.log(file.type);

      reader.readAsDataURL(file);
      reader.onload = async () => {
        let value = {
          filetype: file.type,
          value: decodeURIComponent(atob(reader.result.split(',')[1]))
        }
        this.world = JSON.parse(value.value);
        await this.screenBlockUpdate();

      };


    }
  }



  screenBlockUpdate(nr?) {
    this.createGrid('worldMap');
    this.createGrid('sector');


    let top,
      bottom;

    if (!nr) {

      top = this.world[0].top;
      bottom = this.world[0].bottom;
    } else {
      for (let i = 0; i < this.world.length; i++) {

        if (this.world[i].number == nr) {
          //    console.log(this.world[i])
          //    console.log(nr)
          top = this.world[i].top;
          bottom = this.world[i].bottom;
        }
      }
    }




    //  console.log(top)
    // console.log(bottom)

    for (let i = 0; i < top.length; i++) {
      for (let OpenBlock of top[i]) {
        let mapCollon = this.mapSettings.toDraw[OpenBlock.collon]
        for (let i2 = 0; i2 < mapCollon.length; i2++) {
          if (mapCollon[i2].block == OpenBlock.block) {
            this.mapSettings.toDraw[OpenBlock.collon][i2] = OpenBlock;
          }

        }
      }
    }

    for (let i = 0; i < bottom.length; i++) {
      for (let OpenBlock of bottom[i]) {
        let mapCollon = this.mapSettings.toDraw2[OpenBlock.collon]
        for (let i2 = 0; i2 < mapCollon.length; i2++) {
          if (mapCollon[i2].block == OpenBlock.block) {
            this.mapSettings.toDraw2[OpenBlock.collon][i2] = OpenBlock;
          }

        }

      }
    }


    // console.log(this.world);
  }
}
