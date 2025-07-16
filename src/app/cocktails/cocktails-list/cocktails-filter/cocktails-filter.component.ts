import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cocktails-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cocktails-filter.component.html',
  styleUrl: './cocktails-filter.component.scss'
})
export class CocktailsFilterComponent {
  @Input() searchControl: FormControl
}
