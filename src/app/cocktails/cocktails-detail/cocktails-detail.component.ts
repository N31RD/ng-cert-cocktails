import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CocktailsService } from '../cocktails.service';
import { map, Observable } from 'rxjs';
import { Cocktail } from '../cocktails.interface';
import { RouterModule } from '@angular/router';
import { FavoriteIconDirective } from '../favorite-icon.directive';

@Component({
  selector: 'app-cocktails-detail',
  standalone: true,
  imports: [RouterModule, MatIconModule, FavoriteIconDirective],
  templateUrl: './cocktails-detail.component.html',
  styleUrl: './cocktails-detail.component.scss'
})
export class CocktailsDetailComponent implements OnInit {
  @Input() id: string;
  protected cocktail: Cocktail;

  constructor(private _cocktailsService: CocktailsService){}

  ngOnInit(): void {
    this._loadCocktail();
  }

  private _loadCocktail() {
    this._cocktailsService.getCocktailById(this.id)
      .pipe(
        map(cocktail => ({
          ...cocktail,
          ingredientsString: cocktail.ingredients.join(' | ')
        }))
      )
      .subscribe(cocktail => this.cocktail = cocktail);
  }
}
