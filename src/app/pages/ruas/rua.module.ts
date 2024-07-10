import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RuaRoutingModule } from './rua-routing.module';
import { RuasComponent } from './rua-listagem/ruas.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RuaRoutingModule,
    RuasComponent,
    ReactiveFormsModule,
  ],
})
export class RuaModule { }
