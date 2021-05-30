import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../receipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() singleRecipe: Recipe;
  @Input() index: number;



  // onRecipeClicked() {
  //   // this.RecipeService.selectedRecipe.emit(this.singleRecipe);
  //   this.RecipeService.getRecipeById(0);
  //   this.router.navigate(['1'], { relativeTo: this.routes });
  // }

}
