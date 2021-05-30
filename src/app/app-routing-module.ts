import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { ReceipesComponent } from "./receipes/receipes.component";
import { RecipeDetailComponent } from "./receipes/recipe-detail/recipe-detail.component";
import { RecipeNewComponent } from "./receipes/recipe-new/recipe-new.component";
import { RecipeNotSelectedComponent } from "./receipes/recipe-not-selected/recipe-not-selected.component";
import { RecipeResolverService } from "./receipes/recipe-resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: ReceipesComponent,canActivate:[AuthGuard], children: [
      { path: '', component: RecipeNotSelectedComponent },
      { path: 'new', component: RecipeNewComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeNewComponent, resolve: [RecipeResolverService] }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent,canActivate:[AuthGuard] },
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}