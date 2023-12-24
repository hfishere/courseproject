import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.less',
})
export class RecipeDetailComponent implements OnInit {
  private recipeService?: RecipeService;
  private id: number;
  recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
