import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { AppComponent } from './app.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';

import { TarotService } from './card-selector/tarotgpt';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CardSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add FormsModule to the imports array
  ],
  providers: [TarotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
