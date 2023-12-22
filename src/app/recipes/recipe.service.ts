import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
        new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
        new Recipe('A Test Recipe 3', 'This is simply a test 3', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
        new Recipe('A Test Recipe 4', 'This is simply a test 4', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg')
      ];

      getRecipes() {
        return this.recipes.slice();
      }
}