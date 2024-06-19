import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-eliminar',
    standalone: true,
    imports: [],
    templateUrl: './modal-eliminar.component.html',
    styleUrl: './modal-eliminar.component.scss'
})
export class ModalEliminarComponent {

    private activeModal = inject(NgbActiveModal)

    cancelar() {
        this.activeModal.dismiss('se cancelo');
    }

    confirmar() {
        this.activeModal.close('eliminar')
    }
}
