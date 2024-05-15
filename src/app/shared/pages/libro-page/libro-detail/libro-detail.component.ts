import { Component, Input, inject } from '@angular/core';
import { ILibro } from '../libro.helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { IPrestamo } from '../../prestamo-page/prestamo.helpers';
import { PrestamoService } from '../../prestamo-page/prestamo.service';
import { PrestamoListComponent } from '../../prestamo-page/prestamo-list/prestamo-list.component';
import { PrestamoFormComponent } from '../../prestamo-page/prestamo-form/prestamo-form.component';

@Component({
    selector: 'app-libro-detail',
    standalone: true,
    imports: [TitleCasePipe, DatePipe, PrestamoListComponent, PrestamoFormComponent],
    templateUrl: './libro-detail.component.html',
    styleUrl: './libro-detail.component.css'
})
export class LibroDetailComponent {

    prestamos: IPrestamo[] = []

    @Input() prestamo: IPrestamo = {} as IPrestamo;
    @Input() libro: ILibro = {} as ILibro;

    
    private prestamoServicio = inject(PrestamoService)
    private activeModal = inject(NgbActiveModal)

    cerrar() {
        this.activeModal.dismiss()
    }

    ngOnInit() {
        // this.obtenerPrestamo()
    }

    // async obtenerPrestamo() {
    //     try {
    //         let result = await this.prestamoServicio.getData({
    //             libro_idlibro: this.libro.idlibro + ""
    //         });
    //         if (result.state == "success") {
    //             let prestamos = result.data ?? []
    //             this.prestamos = prestamos.filter((p: IPrestamo) => p.libro_idlibro == this.libro.idlibro)
    //             console.log(this.prestamos)
    //         }
    //     } catch (error) {

    //     }
    // }


}
