import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    startEditting = new Subject<number>();

    private Ingredients: Ingredient[] = [];

    getIngredients() {
        return this.Ingredients.slice();
    }

    getIngredientByIndex(index: number) {
        return this.Ingredients[index];
    }
    onIngredAdded(ingredient: Ingredient) {
        this.Ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.Ingredients.slice());
    }

    addIngredients(ingredient: Ingredient[]) {
        this.Ingredients.push(...ingredient);
        this.ingredientsChanged.emit(this.Ingredients.slice());
    }

    updateIngredient(index: number, updatedIngredient: Ingredient) {
        this.Ingredients[index] = updatedIngredient;
        this.ingredientsChanged.emit(this.Ingredients.slice());
    }

    deleteItem(index: number) {
        this.Ingredients.splice(index, 1);
        this.ingredientsChanged.emit(this.Ingredients.slice());
    }
}