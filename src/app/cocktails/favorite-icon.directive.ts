import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Directive({
  selector: '[appFavoriteIcon]',
  standalone: true
})
export class FavoriteIconDirective {
  id: string;

  constructor(private _el: ElementRef, private _favoritesService: FavoritesService, private _renderer: Renderer2) {}

  ngAfterViewInit() {
    this._extractId(this._el.nativeElement.id);
    this._toggleActiveClass();
  }

  @HostListener('click') onClick() {
    this._favoritesService.toggleFavorite(this.id);
    this._toggleActiveClass();
  }

  private _extractId(id: string) {
    this.id = id.replace('star-', '');
  }

  private _toggleActiveClass() {
    if (this._favoritesService.isFavorite(this.id)) {
      this._renderer.addClass(this._el.nativeElement, 'active');
    } else {
      this._renderer.removeClass(this._el.nativeElement, 'active');
    }
  }

}
