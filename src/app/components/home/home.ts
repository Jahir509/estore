import { Component } from '@angular/core';
import { Header } from './header/header';
import { Navigation } from './navigation/navigation';
import { Sidenavigation } from './sidenavigation/sidenavigation';
import { Products } from "../products/products";

@Component({
  selector: 'app-home',
  imports: [Header, Navigation, Sidenavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
