import { Component } from '@angular/core';
import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';
import { EstudianteService } from './estudiante.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estudiante-page',
  standalone: true,
  imports: [EstudianteListComponent],
  providers:[EstudianteService, HttpClient],
  templateUrl: './estudiante-page.component.html',
  styleUrl: './estudiante-page.component.css'
})
export class EstudiantePageComponent {

}
