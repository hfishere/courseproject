import { 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  inject } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.less'
})
export class RecipeListComponent implements OnInit {
  private recipeService?: RecipeService;
  @Input() recipes: Recipe[];

  constructor() {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
}
