import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.less'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  @Input() recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe 3', 'This is simply a test 3', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe 4', 'This is simply a test 4', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg')
  ];

  onSelectedRecipe(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
