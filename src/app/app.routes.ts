import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    {   path: 'home', 
        loadComponent: () => import('./components/home/home').then(m => m.Home),
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            { path: 'products', loadComponent: () => import('./components/home/products-gallery/products-gallery').then(m => m.ProductsGallery) },
            { path: 'product/:id', loadComponent: () => import('./components/home/products-details/products-details').then(m => m.ProductsDetails) },
            { path: 'cart', loadComponent: () => import('./components/home/cart/cart').then(m => m.Cart) },
            { path: 'signup', loadComponent: () => import('./components/home/auth/signup/signup').then(m => m.Signup)},
            { path: 'login', loadComponent: () => import('./components/home/auth/login/login').then(m => m.Login)},
            { path: 'past-orders', loadComponent: () => import('./components/home/order/past-orders/past-orders').then(m => m.PastOrders) },
        ]
    },  
    { path: '', redirectTo: '/home/products', pathMatch: 'full' },
    { path: '**', component: NotFound },
];
