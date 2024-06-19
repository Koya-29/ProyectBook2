import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrestamoDetailComponent } from '../prestamo-detail/prestamo-detail.component';
import { PrestamoFormComponent } from '../prestamo-form/prestamo-form.component';
import { IPrestamo, PrestamoStateColor, PrestamoStateDictionary } from '../prestamo.helpers';
import { PrestamoService } from '../prestamo.service';
import { FormsModule } from '@angular/forms';
import { TextStateComponent } from '../../../ui/text-state/text-state.component';
import { ToastrService } from 'ngx-toastr';
import { ModalEliminarComponent } from '../../../components/modal-eliminar/modal-eliminar.component';

@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [DatePipe, NgClass, PrestamoDetailComponent, FormsModule, TextStateComponent],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.css'
})
export class PrestamoListComponent {

    private prestamosServicio = inject(PrestamoService)
    private modalService = inject(NgbModal)
    private toastrServicio = inject(ToastrService)

    loans: IPrestamo[] = []

    @Input() idlibro: string = "";
    @Input() idestudiante: string = "";

    diccionario = PrestamoStateDictionary;
    color = PrestamoStateColor

    ngOnInit() {
        this.getData()
    }


    seleccionado: IPrestamo = {} as IPrestamo

    seleccionar(idprestamo: IPrestamo) {
        this.seleccionado = idprestamo
    }

    texto_prestamo = ""

    async getData() {
        let date = await this.prestamosServicio.list({
            estudiante_idestudiante: this.idestudiante,
            libro_idlibro: this.idlibro,
            texto: this.texto_prestamo
        })
        if (date && date.state == 'success') {
            // this.toastrServicio.success('con exito', 'Se inicio')
            this.loans = date.data ?? []
        }
    }

    async add() {
        try {
            let ref = this.modalService.open(PrestamoFormComponent, { keyboard: false, backdrop: 'static' })
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
        let modalEliminar = this.modalService.open(ModalEliminarComponent, { keyboard: false, backdrop: 'static' })
        try {
            let result = await modalEliminar.result
            if (result === 'eliminar') {
                result = await this.prestamosServicio.delete(prestamo)
            }
            // let result = await this.prestamosServicio.delete(prestamo)
            if (result && result.state == "success") {
                let index = this.loans.findIndex(x => x.idprestamo == prestamo.idprestamo)
                if (index != -1) {
                    this.loans.splice(index, 1)
                }
            }
        } catch (error) { }
    }

    async editar(prestamo: IPrestamo) {
        try {
            let ref = this.modalService.open(PrestamoFormComponent, { keyboard: false, backdrop: 'static' })
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
