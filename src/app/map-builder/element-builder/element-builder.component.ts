import { Component, OnInit, Compiler } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-element-builder',
  templateUrl: './element-builder.component.html',
  styleUrls: ['./element-builder.component.css']
})
export class ElementBuilderComponent implements OnInit {
public Object =Object;
  public elementList={
    top:[],
    bottom:[],
    selected:'',
    selectedToApply:{},
    

  };
  constructor(private _compiler: Compiler, private sanitizer: DomSanitizer, private database: DatabaseService) {


    this.database.getJSON('textures', 'top').then((result) => {

      this.elementList.top= <any>result;

      console.log(this.elementList)
    })
  }

  ngOnInit() {
  }


  async doSomething(task, event?, block?, i?, i2?) {
    if (task == "selectTexture") {
      event.preventDefault();
      event.style
      this.elementList.selectedToApply = block
      console.log(block)
    }

 






  }


}
