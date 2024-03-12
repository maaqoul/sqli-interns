import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { DetailsComponent } from '../details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'heroes',
        component: HeroesComponent,
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
    },
];
