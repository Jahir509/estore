import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-home',
  imports: [Header,Navigation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
