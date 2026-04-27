import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    {   path: 'home', 
        loadComponent: () => import('./components/home/home').then(m => m.Home),
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            { path: 'products', loadComponent: () => import('./components/home/products-gallery/products-gallery').then(m => m.ProductsGallery) }
        ]
    },  
    { path: '', redirectTo: '/home/products', pathMatch: 'full' },
    { path: '**', component: NotFound },
];
