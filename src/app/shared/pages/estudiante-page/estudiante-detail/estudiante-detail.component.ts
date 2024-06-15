import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { IPrestamo } from '../../prestamo-page/prestamo.helpers';
import { PrestamoService } from '../../prestamo-page/prestamo.service';
import { PrestamoListComponent } from '../../prestamo-page/prestamo-list/prestamo-list.component';
import { IEstudiante } from '../estudiante.helpers';

@Component({
    selector: 'app-estudiante-detail',
    standalone: true,
    imports: [DatePipe, TitleCasePipe, PrestamoListComponent],
    templateUrl: './estudiante-detail.component.html',
    styleUrl: './estudiante-detail.component.css'
})
export class EstudianteDetailComponent {

    prestamos: IPrestamo[] = []

    @Input() prestamo: IPrestamo = {} as IPrestamo
    @Input() estudiante: IEstudiante = {} as IEstudiante;


    private prestamoServicio = inject(PrestamoService)
    private activeModal = inject(NgbActiveModal)

    cerrar() {
        this.activeModal.dismiss()
    }

    ngOnInit() {
        // this.obtenerPrestamo()
    }


    //   async obtenerPrestamo() {
    //     try {
    //       let result = await this.prestamoServicio.getData({
    //         estudiante_idestudiante: this.estudiante.idestudiante
    //       })
    //       if (result.state == "success") {
    //         this.prestamos = result.data ?? []
    //       }
    //     } catch (error) {

    //     }
    //   }


    //filtarlo desde la consola
    // async obtenerPrestamo() {
    //   try {
    //     let result = await this.prestamoServicio.getData()
    //     if (result.state == "success") {
    //       let prestamos = result.data ?? []

    //       this.prestamos = prestamos.filter((p: IPrestamo) => p.estudiante_idestudiante == this.estudiante.idestudiante)
    //       console.log(this.prestamos)
    //     }
    //   } catch (error) {

    //   }
    // }
    //filtarlo desde la consola


}
