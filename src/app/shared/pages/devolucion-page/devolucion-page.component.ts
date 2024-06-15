import { Component } from '@angular/core';
import { DevolucionListComponent } from './devolucion-list/devolucion-list.component';

@Component({
    selector: 'app-devolucion-page',
    standalone: true,
    imports: [DevolucionListComponent],
    templateUrl: './devolucion-page.component.html',
    styleUrl: './devolucion-page.component.scss'
})
export class DevolucionPageComponent {

}
