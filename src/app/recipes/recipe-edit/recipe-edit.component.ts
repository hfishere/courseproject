import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.less'
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  private recipeService?: RecipeService;

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onAddIngredient() {
    const ingFormArray = (this.recipeForm.get('ingredients') as FormArray);

    ingFormArray.push(
      this.formBuilder.group({
        name: [null, Validators.required],
        amount: [
          null,
          [
            Validators.required, ,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
        ]
      })
    );

    // Below method can prevent add new row if last FormArray was not valid, it might be useful for someone needs out there
    // if (this.editMode) {      
    //   const lastIndex = ingFormArray.length - 1;
  
    //   if (ingFormArray.at(lastIndex).valid) {
    //     ingFormArray.push(
    //       this.formBuilder.group({
    //         name: [null, Validators.required],
    //         amount: [
    //           null,
    //           [
    //             Validators.required, ,
    //             Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ]
    //         ]
    //       })
    //     );
    //   }    
    //   // Should return error or something
    // } else {
    //   ingFormArray.push(
    //     this.formBuilder.group({
    //       name: [null, Validators.required],
    //       amount: [
    //         null,
    //         [
    //           Validators.required, ,
    //           Validators.pattern(/^[1-9]+[0-9]*$/)
    //         ]
    //       ]
    //     })
    //   );
    // }  
  }

  onDeleteIngredient(index: number) {
    // Should delete ingredient row
    const ingFormArray = (this.recipeForm.get('ingredients') as FormArray);

    if (ingFormArray.length != 1) {
      ingFormArray.removeAt(index);
    }

    // Should return something like alert or else
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }  

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.formBuilder.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]
              ]
            })
          );
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients
    });
  }

}
