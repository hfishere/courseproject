import { Injectable, inject } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  shoppingListService?: ShoppingListService;
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //     new Recipe(
  //       'Sayur Asem', 
  //       'This is simply a test 1', 
  //       'https://harianresep.com/wp-content/uploads/2020/06/resep-sayur-asem.jpg',
  //       [
  //         new Ingredient('Bawang Merah', 2),
  //         new Ingredient('Bawang Putih', 1),
  //         new Ingredient('Asam Jawa', 1),
  //       ]),
  //     new Recipe(
  //       'Ayam Bakar', 
  //       'This is simply a test 1', 
  //       'https://img.qraved.co/v2/image/data/2015/11/05/ayam_bakar-740x493-x.jpg',
  //       [
  //         new Ingredient('Ayam', 1),
  //         new Ingredient('Kecap', 1),
  //         new Ingredient('Saos Lada Hitam', 2),
  //       ]),
  //     new Recipe(
  //       'Lalapan', 
  //       'This is simply a test 1', 
  //       'https://cms.sehatq.com/public/img/article_img/13-sayur-lalapan-khas-indonesia-yang-nikmat-disantap-matang-ataupun-mentah-1623719683.jpg',
  //       [
  //         new Ingredient('Selada', 1),
  //         new Ingredient('Timun', 2),
  //         new Ingredient('Wortel', 3),
  //       ])      
  //   ];

  private recipes: Recipe[] = [];

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}