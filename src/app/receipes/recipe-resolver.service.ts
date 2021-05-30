import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SaveDataService } from "../shared/save-data.service";
import { Recipe } from "./receipes.model";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: SaveDataService,private recipeService:RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipe = this.recipeService.getRecipe();

        if(recipe.length === 0){
            return this.dataStorageService.fetchRecipe();
        }else{
            return recipe;
        }
    }
}