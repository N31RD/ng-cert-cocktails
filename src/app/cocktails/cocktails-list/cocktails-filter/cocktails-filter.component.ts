import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cocktails-filter',
  standalone: true,
  imports: [],
  templateUrl: './cocktails-filter.component.html',
  styleUrl: './cocktails-filter.component.scss'
})
export class CocktailsFilterComponent {
  @Output() searchChange = new EventEmitter<string>();

  protected onInputChange($event: Event) {
    this.searchChange.emit(($event.target as HTMLInputElement).value);
  }

}
