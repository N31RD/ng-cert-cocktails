import { Routes } from '@angular/router';
import { CocktailsDetailComponent } from './cocktails/cocktails-detail/cocktails-detail.component';
import { CocktailsListComponent } from './cocktails/cocktails-list/cocktails-list.component';

export const routes: Routes = [
    {
        path: '',
        component: CocktailsListComponent
    },
    {
        path: ':id',
        component: CocktailsDetailComponent
    }
];
