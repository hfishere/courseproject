import { 
  Component, 
  Input,
  inject, 
  } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.less'
})
export class RecipeItemComponent {
  recipeService?: RecipeService;
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() {
    this.recipeService = inject(RecipeService);
  }
}
