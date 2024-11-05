import { Component, OnInit } from '@angular/core';
import { MealService } from '../../app/services/meal.service';

@Component({
  selector: 'app-meals',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Recetas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-searchbar
        [(ngModel)]="searchTerm"
        (ionChange)="searchMeals()"
        placeholder="Buscar recetas"
        animated
        [debounce]="300">
      </ion-searchbar>

      <!-- Indicador de carga -->
      <div *ngIf="isLoading" class="ion-text-center ion-padding">
        <ion-spinner></ion-spinner>
        <p>Cargando recetas...</p>
      </div>

      <!-- Lista de recetas -->
      <ion-list *ngIf="!isLoading">
        <ion-item *ngFor="let meal of meals" [button]="true" (click)="showMealDetails(meal)">
          <ion-thumbnail slot="start">
            <ion-img [src]="meal.strMealThumb"></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ meal.strMeal }}</h2>
            <p>Categoría: {{ meal.strCategory }}</p>
            <p>Origen: {{ meal.strArea }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Mensaje cuando no hay resultados -->
      <ion-text *ngIf="!isLoading && meals.length === 0" class="ion-text-center ion-padding">
        <p>No se encontraron recetas</p>
      </ion-text>

      <!-- Mensaje de error -->
      <ion-text color="danger" *ngIf="error" class="ion-text-center ion-padding">
        <p>{{ error }}</p>
      </ion-text>

      <!-- Pull to refresh -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </ion-content>

    <!-- Botón flotante para receta aleatoria -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button (click)="loadRandomMeal()">
        <ion-icon name="dice-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `
})
export class MealsPage implements OnInit {
  meals: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.loadRandomMeal();
  }

  searchMeals() {
    if (this.searchTerm.length > 2) {
      this.isLoading = true;
      this.error = '';
      
      this.mealService.searchMeals(this.searchTerm).subscribe({
        next: (meals) => {
          this.meals = meals;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Error al buscar recetas';
          this.isLoading = false;
        }
      });
    } else if (this.searchTerm.length === 0) {
      this.loadRandomMeal();
    }
  }

  loadRandomMeal() {
    this.isLoading = true;
    this.error = '';
    
    this.mealService.getRandomMeal().subscribe({
      next: (meal) => {
        this.meals = meal ? [meal] : [];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la receta';
        this.isLoading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.mealService.getRandomMeal().subscribe({
      next: (meal) => {
        this.meals = meal ? [meal] : [];
        event.target.complete();
      },
      error: (err) => {
        this.error = 'Error al refrescar';
        event.target.complete();
      }
    });
  }

  showMealDetails(meal: any) {
    // Aquí puedes implementar la navegación a los detalles
    console.log('Detalles de la receta:', meal);
  }
}