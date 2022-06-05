import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientInput, Recipe } from '../recipe/recipe';

@Component({
    selector: 'app-ingredient-input',
    templateUrl: './ingredient-input.component.html',
    styleUrls: ['./ingredient-input.component.css'],
})

export class IngredientInputComponent {
    @Output() newIngredientEvent = new EventEmitter<IngredientInput>();
    @Input() recipe!: Recipe;

    newIngredient(input: NgForm) {
        this.newIngredientEvent.emit({name: input.value.ingName, value: input.value.ingVal})
    }
}
