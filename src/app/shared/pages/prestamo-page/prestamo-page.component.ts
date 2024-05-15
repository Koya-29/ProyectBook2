import { Component } from '@angular/core';
import { PrestamoListComponent } from './prestamo-list/prestamo-list.component';
import { PrestamoService } from './prestamo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prestamo-page',
  standalone: true,
  imports: [PrestamoListComponent],
  providers: [PrestamoService, HttpClient],
  templateUrl: './prestamo-page.component.html',
  styleUrl: './prestamo-page.component.css'
})
export class PrestamoPageComponent {

}
