import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = new BehaviorSubject<Recipe[]>([
    {
      id: 1,
      title: 'Pasta Carbonara',
      chef: 'María García',
      time: '25 min',
      difficulty: 'Fácil',
      rating: 4.8,
      image: 'assets/images/carbonara.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Salmón al Horno',
      chef: 'Carlos Ruiz',
      time: '35 min',
      difficulty: 'Medio',
      rating: 4.5,
      image: 'assets/images/salmon.jpg'
    },
    {
      id: 3,
      title: 'Ensalada César',
      chef: 'Ana Martínez',
      time: '15 min',
      difficulty: 'Fácil',
      rating: 4.6,
      image: 'assets/images/caesar-salad.jpg'
    }
  ]);

  getRecipes(): Observable<Recipe[]> {
    return this.recipes.asObservable();
  }
}
