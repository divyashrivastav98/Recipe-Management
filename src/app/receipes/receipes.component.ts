import { Component, OnInit } from '@angular/core';
import { Recipe } from './receipes.model';


@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css']
})
export class ReceipesComponent implements OnInit {
  recipeSelected :Recipe;
  constructor( ) { }

  ngOnInit(): void {
    
  }

}
