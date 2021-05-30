import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  Ingredients: Ingredient[];
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.Ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe(
      (Ingredients : Ingredient[]) => {
        this.Ingredients = Ingredients;
      }
    )
  }

  onEditIngred(id:number){
    this.shoppingListService.startEditting.next(id);
  }
  
}
