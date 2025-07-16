import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cocktail } from './cocktails.interface';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private _http: HttpClient) { }

  getAllCocktails(): Observable<Cocktail[]> {
      return this._http.get<Cocktail[]>('/cocktails');
  }

  getCocktailById(id: string): Observable<Cocktail> {
    return this._http.get<Cocktail>(`/cocktails/${id}`);
  }
}
