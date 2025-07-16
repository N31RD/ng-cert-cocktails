import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../cocktails.service';
import { Cocktail } from '../cocktails.interface';
import { CocktailsListItemComponent } from "./cocktails-list-item/cocktails-list-item.component";
import { CocktailsFilterComponent } from "./cocktails-filter/cocktails-filter.component";
import { map } from 'rxjs';

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [CocktailsListItemComponent, CocktailsFilterComponent],
  templateUrl: './cocktails-list.component.html',
  styleUrl: './cocktails-list.component.scss'
})
export class CocktailsListComponent implements OnInit {
  private _cocktails: Cocktail[];
  private _search: string = '';

  constructor(private _cocktailsService: CocktailsService){}

  ngOnInit(): void {
    this._loadCocktails();
  }

  onSearchChange(value: string) {
    this._search = value;
  }

  protected get filteredCocktails() {
    const filter = this._search.toLowerCase().trim();
    if (filter) {
      return this._cocktails.filter(cocktail => cocktail.name.toLowerCase().startsWith(filter));      
    }
    return this._cocktails;
  }

  private _loadCocktails() {
    this._cocktailsService.getAllCocktails()
      .pipe(
        map(cocktails => cocktails.map(cocktail => ({
          ...cocktail,
          ingredientsString: cocktail.ingredients.join(' | ')
        })))
      )
      .subscribe(cocktails => this._cocktails = cocktails);
  }

}
