import { 
  Component, 
  Input, 
  OnInit, 
  inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
