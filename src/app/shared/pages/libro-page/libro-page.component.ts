import { Component } from '@angular/core';
import { LibroListComponent } from './libro-list/libro-list.component';
import { LibroService } from './libro.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-libro-page',
  standalone: true,
  imports: [LibroListComponent],
  providers: [LibroService, HttpClient],
  templateUrl: './libro-page.component.html',
  styleUrl: './libro-page.component.css'
})
export class LibroPageComponent {

}
