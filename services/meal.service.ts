// src/app/services/meal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getRandomMeal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random.php`).pipe(
      map((response: any) => response.meals?.[0]),
      catchError(() => of(null))
    );
  }

  searchMeals(term: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/search.php?s=${term}`).pipe(
      map((response: any) => response.meals || []),
      catchError(() => of([]))
    );
  }

  getMealById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`).pipe(
      map((response: any) => response.meals?.[0]),
      catchError(() => of(null))
    );
  }

  getMealsByCategory(category: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/filter.php?c=${category}`).pipe(
      map((response: any) => response.meals || []),
      catchError(() => of([]))
    );
  }
}