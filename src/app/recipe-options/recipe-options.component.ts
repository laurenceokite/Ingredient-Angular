import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalSystems, GlobalUnits, Recipe } from '../recipe/recipe';

@Component({
  selector: 'app-recipe-options',
  templateUrl: './recipe-options.component.html',
  styleUrls: ['./recipe-options.component.css']
})
export class RecipeOptionsComponent {
  @Input() recipe!: Recipe;
  @Output() systemChangeEvent = new EventEmitter<GlobalSystems>();
  @Output() unitChangeEvent = new EventEmitter<GlobalUnits>();

  changeSystem(system: GlobalSystems) {
    this.systemChangeEvent.emit(system);
  } 

  changeUnit(units: GlobalUnits) {
    this.unitChangeEvent.emit(units);
  }
}
