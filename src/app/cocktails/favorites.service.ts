import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly FAVORITES_KEY = 'favoriteItems';

  constructor() {}

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  addToFavorites(id: string): void {
    const favorites = this.getFavorites();
    favorites.push(id);
    this._saveFavorites(favorites);
  }

  removeFromFavorites(id: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav !== id);
    this._saveFavorites(favorites);
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: string) {
    if (this.isFavorite(id)) {
      this.removeFromFavorites(id);
    } else {
      this.addToFavorites(id);
    }
  }

  private _saveFavorites(favorites: string[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}
