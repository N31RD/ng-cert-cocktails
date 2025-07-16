import { Component, Input } from '@angular/core';
import { Cocktail } from '../../cocktails.interface';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../favorites.service';

@Component({
  selector: 'app-cocktails-list-item',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './cocktails-list-item.component.html',
  styleUrl: './cocktails-list-item.component.scss'
})
export class CocktailsListItemComponent {
  @Input() cocktail: Cocktail;

  constructor(private _favoritesService: FavoritesService){}

  toggleFavorite() {
    this.cocktail = { ...this.cocktail, isFavorite: !this.cocktail.isFavorite}
    if (this.cocktail.isFavorite) {
      this._favoritesService.addToFavorites(this.cocktail.id);
    } else {
      this._favoritesService.removeFromFavorites(this.cocktail.id);
    }
  }
}
