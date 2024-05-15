import { Component } from '@angular/core';
import { HomeListComponent } from './home-list/home-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
