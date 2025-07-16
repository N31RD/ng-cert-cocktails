import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cocktail } from '../../cocktails.interface';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteIconDirective } from '../../favorite-icon.directive';

@Component({
  selector: 'app-cocktails-list-item',
  standalone: true,
  imports: [RouterModule, MatIconModule, FavoriteIconDirective],
  templateUrl: './cocktails-list-item.component.html',
  styleUrl: './cocktails-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailsListItemComponent {
  @Input() cocktail: Cocktail;
}
