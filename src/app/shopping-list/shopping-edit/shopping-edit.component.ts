import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') formDetails: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngred: Ingredient;
  deleteItem = false;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedIngred = this.shoppingListService.getIngredientByIndex(index)
      this.formDetails.setValue({
        name: this.editedIngred.name,
        amount: this.editedIngred.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingAdded = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingAdded)
    } else {
      this.shoppingListService.onIngredAdded(ingAdded);
    }
    this.editMode = false;
    form.reset();

    // this.formDetails.setValue({
    //   name: '',
    //   amount: ''
    // })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onClear(){
    this.formDetails.reset();;
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
}

