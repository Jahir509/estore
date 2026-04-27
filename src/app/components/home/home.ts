import { Component } from '@angular/core';
import { Header } from './header/header';
import { Navigation } from './navigation/navigation';
import { Sidenavigation } from './sidenavigation/sidenavigation';

@Component({
  selector: 'app-home',
  imports: [Header,Navigation,Sidenavigation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
