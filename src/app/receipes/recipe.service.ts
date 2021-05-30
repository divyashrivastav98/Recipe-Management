import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./receipes.model";

@Injectable()
export class RecipeService {
    constructor(private shoppingListService: ShoppingListService) { }

    // selectedRecipe = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private Recipes: Recipe[] = [];

    getRecipe() {
        return this.Recipes.slice();
    }
    getRecipeById(id: number) {
        return this.Recipes[id];
    }

    onIngredientAddedToShoppingList(ingredient: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredient);
    }


    addRecipe(recipe: Recipe) {
        this.Recipes.push(recipe);
        this.recipesChanged.next(this.Recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.Recipes[index] = newRecipe;
        this.recipesChanged.next(this.Recipes.slice());
    }

    deleteRecipe(index: number) {
        this.Recipes.splice(index, 1);
        this.recipesChanged.next(this.Recipes.slice());
    }

    setRecipe(recipes: Recipe[]) {
        this.Recipes = recipes;
        this.recipesChanged.next(this.Recipes.slice());
    }

}