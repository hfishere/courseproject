import { Injectable, inject } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    shoppingListService?: ShoppingListService;

    private recipes: Recipe[] = [
        new Recipe(
          1,
          'Sayur Asem', 
          'This is simply a test 1', 
          'https://harianresep.com/wp-content/uploads/2020/06/resep-sayur-asem.jpg',
          [
            new Ingredient('Bawang Merah', 2),
            new Ingredient('Bawang Putih', 1),
            new Ingredient('Asam Jawa', 1),
          ]),
        new Recipe(
          2,
          'Ayam Bakar', 
          'This is simply a test 1', 
          'https://img.qraved.co/v2/image/data/2015/11/05/ayam_bakar-740x493-x.jpg',
          [
            new Ingredient('Ayam', 1),
            new Ingredient('Kecap', 1),
            new Ingredient('Saos Lada Hitam', 2),
          ]),
        new Recipe(
          3,
          'Lalapan', 
          'This is simply a test 1', 
          'https://cms.sehatq.com/public/img/article_img/13-sayur-lalapan-khas-indonesia-yang-nikmat-disantap-matang-ataupun-mentah-1623719683.jpg',
          [
            new Ingredient('Selada', 1),
            new Ingredient('Timun', 2),
            new Ingredient('Wortel', 3),
          ])      
      ];

      constructor() {
        this.shoppingListService = inject(ShoppingListService);
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
}