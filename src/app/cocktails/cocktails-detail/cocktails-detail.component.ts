import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CocktailsService } from '../cocktails.service';
import { map, Observable } from 'rxjs';
import { Cocktail } from '../cocktails.interface';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-cocktails-detail',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './cocktails-detail.component.html',
  styleUrl: './cocktails-detail.component.scss'
})
export class CocktailsDetailComponent implements OnInit {
  @Input() id: string;
  protected cocktail: Cocktail;

  constructor(private _cocktailsService: CocktailsService, private _favoritesService: FavoritesService){}

  ngOnInit(): void {
    this._loadCocktail();
  }

  toggleFavorite() {
    this.cocktail = { ...this.cocktail, isFavorite: !this.cocktail.isFavorite}
    if (this.cocktail.isFavorite) {
      this._favoritesService.addToFavorites(this.cocktail.id);
    } else {
      this._favoritesService.removeFromFavorites(this.cocktail.id);
    }
  }

  private _loadCocktail() {
    this._cocktailsService.getCocktailById(this.id)
      .pipe(
        map(cocktail => ({
          ...cocktail,
          ingredientsString: cocktail.ingredients.join(' | '),
          isFavorite: this._favoritesService.isFavorite(cocktail.id)
        }))
      )
      .subscribe(cocktail => this.cocktail = cocktail);
  }
}
