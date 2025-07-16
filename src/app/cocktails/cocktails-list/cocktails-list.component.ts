import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../cocktails.service';
import { Cocktail } from '../cocktails.interface';
import { CocktailsListItemComponent } from "./cocktails-list-item/cocktails-list-item.component";
import { CocktailsFilterComponent } from "./cocktails-filter/cocktails-filter.component";
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [CocktailsListItemComponent, CocktailsFilterComponent, AsyncPipe],
  templateUrl: './cocktails-list.component.html',
  styleUrl: './cocktails-list.component.scss'
})
export class CocktailsListComponent implements OnInit {
  protected cocktails$: Observable<Cocktail[]>;
  searchControl = new FormControl('');

  constructor(private _cocktailsService: CocktailsService){}

  ngOnInit(): void {
    this._loadCocktails();
  }

  protected filteredCocktails$: Observable<Cocktail[]> = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    startWith(this.searchControl.value),
    switchMap((searchTerm: string | null) =>
      this.cocktails$.pipe(
        map(cocktails =>
          cocktails.filter(cocktail =>
            cocktail.name.toLowerCase().includes(searchTerm?.toLowerCase().trim() ?? '')
          )
        )
      )
    )
  );

  private _loadCocktails() {
    this.cocktails$ = this._cocktailsService.getAllCocktails()
      .pipe(
        map(cocktails => cocktails.map(cocktail => ({
          ...cocktail,
          ingredientsString: cocktail.ingredients.join(' | ')
        })))
      );
  }

}
