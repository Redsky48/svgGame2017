import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgInitDirectiveDirective } from './ng-init-directive.directive';
import { BagComponent } from './bag/bag.component';
import { CharacterCreatorComponent } from './character-creator/character-creator.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { MapGameComponent } from './map-game/map-game.component';
import { MessageService } from './message.service';
import { DatabaseService } from './database.service';
import { SanitazePipe } from './sanitaze.pipe';
import { MapBuilderComponent } from './map-builder/map-builder.component';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';
import { ElementBuilderComponent } from './map-builder/element-builder/element-builder.component';
import { EnemyBuilderComponent } from './map-builder/enemy-builder/enemy-builder.component';
import { StoryBuilderComponent } from './map-builder/story-builder/story-builder.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NgInitDirectiveDirective,
    NgInitDirectiveDirective,
    BagComponent,
    CharacterCreatorComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    StartMenuComponent,
    MapGameComponent,
    SanitazePipe,
    MapBuilderComponent,
    ElementBuilderComponent,
    EnemyBuilderComponent,
    StoryBuilderComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
     MatCheckboxModule
  
  ],
  providers: [
    MessageService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
