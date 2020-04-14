import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  //passes an array of recipes as a value
  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'A super tasty Schnitzel - Just awesome',
            'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger',
            'What else do you need to say?',
            'https://www.seriouseats.com/recipes/images/2017/06/20170617-bulgogi-burger-matt-clifton-1-1500x1125.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ];

    constructor(private slService: ShoppingListService) {}

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
        this.slService.addIngredients(ingredients);
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
