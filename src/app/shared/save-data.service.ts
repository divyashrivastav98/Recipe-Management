import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../receipes/receipes.model";
import { RecipeService } from "../receipes/recipe.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class SaveDataService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    saveRecipe() {
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://recipe-management-5f746-default-rtdb.firebaseio.com/recipe.json',
            recipes).subscribe((response) => {
                console.log(response);
            })
    }

    fetchRecipe() {
        return this.http.get<Recipe[]>('https://recipe-management-5f746-default-rtdb.firebaseio.com/recipe.json')
            .pipe(
                map((response) => {
                    return response.map(item => {
                        return { ...item, ingredient: item.ingredient ? item.ingredient : [] };
                    })
                }),
                tap((response) => {
                    this.recipeService.setRecipe(response);
                }))
    }


}