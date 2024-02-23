import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [BrowserModule, CommonModule, FormsModule, BrowserAnimationsModule],
    declarations: [AppComponent, BoardComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
