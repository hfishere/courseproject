import { Component, Input, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.less',
})
export class RecipeDetailComponent {
  private recipeService?: RecipeService;
  @Input() recipe: Recipe;

  constructor() {
    this.recipeService = inject(RecipeService);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
