import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.less'
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://ladyandtheblog.com/wp-content/uploads/2019/12/Bread8.jpg')
  ];
}
