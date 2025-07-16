import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CocktailsListComponent } from "./cocktails/cocktails-list/cocktails-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: 'app.component.html',
})
export class AppComponent {
}
