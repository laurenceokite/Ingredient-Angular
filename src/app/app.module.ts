import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientInputComponent } from './ingredient-input/ingredient-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RecipeOptionsComponent } from './recipe-options/recipe-options.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    IngredientInputComponent,
    RecipeOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
