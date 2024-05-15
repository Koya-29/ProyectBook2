import { Component } from '@angular/core';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorService } from './autor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autor-page',
  standalone: true,
  imports: [ AutorListComponent],
  providers: [AutorService, HttpClient],
  templateUrl: './autor-page.component.html',
  styleUrl: './autor-page.component.css'
})
export class AutorPageComponent {

}
