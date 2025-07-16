import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Directive({
  selector: '[appFavoriteIcon]',
  standalone: true
})
export class FavoriteIconDirective {
  id: string | null;

  @HostBinding('class.favorite-style') isFavorite = false;

  constructor(private _el: ElementRef, private _favoritesService: FavoritesService) {}

  ngAfterViewInit() {
    this.extractId(this._el.nativeElement.id);
    if (this.id) {
      this.isFavorite = this._favoritesService.isFavorite(this.id);
    }
  }

  @HostListener('click') onClick() {
    this.isFavorite = !this.isFavorite;
    this._favoritesService.toggleFavorite(this.id, this.isFavorite);
  }

  private extractId(id: string) {
    const match = id.match(/star-(\d+)/);
    this.id = match ? match[1] : null;
  }

}
