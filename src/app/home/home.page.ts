import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  categories = ['Todos', 'Popular', 'Trending', 'Reciente'];
  selectedCategory = 'Todos';
  recipes: Recipe[] = [];
  featuredRecipe?: Recipe;
  regularRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.featuredRecipe = recipes.find(recipe => recipe.featured);
      this.regularRecipes = recipes.filter(recipe => !recipe.featured);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    // Aquí implementarías la lógica de filtrado
  }
}
