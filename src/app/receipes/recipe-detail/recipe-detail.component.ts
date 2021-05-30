import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../receipes.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipeSelected : Recipe;
  recipeSelected: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private routes: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routes.params.subscribe((updatedParam: Params) => {
      this.id = +updatedParam['id'];
      this.recipeSelected = this.recipeService.getRecipeById(this.id);
    })
  }

  onAddToShoppingList() {
    this.recipeService.onIngredientAddedToShoppingList(this.recipeSelected.ingredient);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.routes });
    // this.router.navigate(["../",this.id,"edit"],{relativeTo:this.routes})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
