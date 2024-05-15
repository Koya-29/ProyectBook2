import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrestamoDetailComponent } from '../prestamo-detail/prestamo-detail.component';
import { PrestamoFormComponent } from '../prestamo-form/prestamo-form.component';
import { IPrestamo } from '../prestamo.helpers';
import { PrestamoService } from '../prestamo.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [DatePipe, NgClass, PrestamoDetailComponent, FormsModule],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.css'
})
export class PrestamoListComponent {


    @Input() idlibro: string = "";
    @Input() idestudiante: string = "";

    loans: IPrestamo[] = []

    private prestamosServicio = inject(PrestamoService)
    private modalService = inject(NgbModal)

    ngOnInit() {
        this.getData()
    }


    seleccionado: IPrestamo = {} as IPrestamo

    seleccionar(idprestamo: IPrestamo) {
        this.seleccionado = idprestamo
    }

    texto_prestamo = ""

    async getData() {
        try {
            let date = await this.prestamosServicio.getData({
                estudiante_idestudiante: this.idestudiante,
                libro_idlibro: this.idlibro,
                texto: this.texto_prestamo
            })
            if (date && date.state == 'success') {
                this.loans = date.data ?? []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add() {
        try {
            let ref = this.modalService.open(PrestamoFormComponent)
            ref.componentInstance.accion = 'add'
            ref.componentInstance.idestudiante = this.idestudiante
            ref.componentInstance.idlibro = this.idlibro
            let prestamo: IPrestamo = await ref.result;
            this.loans.unshift(prestamo)
        } catch (error) {
            console.log(error)
        }
    }


    async eliminar(prestamo: IPrestamo) {
        let result = await this.prestamosServicio.eliminarLoan(prestamo.idprestamo)
        if (result && result.state == "success") {
            let index = this.loans.findIndex(x => x.idprestamo == prestamo.idprestamo)
            if (index != -1) {
                this.loans.splice(index, 1)
            }
        }
    }

    async editar(prestamo: IPrestamo) {
        try {
            let ref = this.modalService.open(PrestamoFormComponent)
            ref.componentInstance.accion = 'edit'
            ref.componentInstance.prestamo = prestamo;

            let _prestamo: IPrestamo = await ref.result;
            Object.assign(prestamo, _prestamo)
        } catch (error) {

        }
    }

    async ver(prestamo: IPrestamo) {
        try {
            let ref = this.modalService.open(PrestamoDetailComponent, { size: 'xl', backdrop: 'static', keyboard: false })
            ref.componentInstance.prestamo = prestamo;
            let _prestamo: IPrestamo = await ref.result;
            Object.assign(prestamo, _prestamo)
        } catch (error) {

        }
    }



}
