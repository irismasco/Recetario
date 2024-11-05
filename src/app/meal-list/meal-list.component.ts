// src/app/components/meal-list/meal-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MealService } from '../../app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  template: `
    <ion-content class="ion-padding">
      <ion-searchbar
        [(ngModel)]="searchTerm"
        (ionChange)="searchMeals()"
        placeholder="Buscar recetas"
        [debounce]="500">
      </ion-searchbar>

      <ion-list>
        <ion-item *ngFor="let meal of meals">
          <ion-thumbnail slot="start">
            <img [src]="meal.strMealThumb" [alt]="meal.strMeal">
          </ion-thumbnail>
          <ion-label>
            <h2>{{ meal.strMeal }}</h2>
            <p>{{ meal.strCategory }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
        (ionInfinite)="loadMore($event)"
        [disabled]="noMoreMeals">
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="Cargando más recetas...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  `,
  styles: [`
    ion-thumbnail {
      --size: 80px;
      margin: 8px;
    }
    
    ion-item {
      --padding-start: 8px;
      --inner-padding-end: 8px;
    }
  `]
})
export class MealListComponent implements OnInit {
  meals: any[] = [];
  searchTerm: string = '';
  noMoreMeals: boolean = false;
  
  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.loadInitialMeals();
  }

  loadInitialMeals() {
    this.mealService.getRandomMeal().subscribe(meal => {
      if (meal) {
        this.meals = [meal];
      }
    });
  }

  searchMeals() {
    if (this.searchTerm.length > 2) {
      this.mealService.searchMeals(this.searchTerm).subscribe(meals => {
        this.meals = meals || [];
        this.noMoreMeals = true;
      });
    } else if (this.searchTerm.length === 0) {
      this.loadInitialMeals();
    }
  }

  loadMore(event: any) {
    setTimeout(() => {
      this.mealService.getRandomMeal().subscribe(meal => {
        if (meal) {
          this.meals.push(meal);
        }
        event.target.complete();
      });
    }, 500);
  }
}