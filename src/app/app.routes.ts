import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomepageComponent } from './welcomepage/WelcomepageComponent';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: WelcomepageComponent
    }
];
