import { Component, Input, inject } from '@angular/core';
import { IPrestamo } from '../prestamo.helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-prestamo-detail',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './prestamo-detail.component.html',
    styleUrl: './prestamo-detail.component.css'
})
export class PrestamoDetailComponent {

    @Input() nombre_libro: string = ""
    @Input() nombre_estudiante: string = ""

    
    @Input() prestamo: IPrestamo = {} as IPrestamo

    private activeModal = inject(NgbActiveModal)

    cerrar() {
        this.activeModal.dismiss()
    }
}
