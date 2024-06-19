import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAutor } from '../autor.helpers';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LibroService } from '../../libro-page/libro.service';
import { ILibro } from '../../libro-page/libro.helpers';
import { LibroListComponent } from '../../libro-page/libro-list/libro-list.component';

@Component({
    selector: 'app-autor-detail',
    standalone: true,
    imports: [DatePipe, TitleCasePipe, LibroListComponent],
    templateUrl: './autor-detail.component.html',
    styleUrl: './autor-detail.component.css'
})
export class AutorDetailComponent {

    libros: ILibro[] = []

    @Input() autor: IAutor = {} as IAutor
    @Input() libro: ILibro = {} as ILibro

    private libroServicio = inject(LibroService)
    private activeModal = inject(NgbActiveModal)


    cerrar() {
        this.activeModal.dismiss('exito')
    }


    ngOnInit() {
        this.ObtenerLibro()
    }

    async ObtenerLibro() {
        try {
            let result = await this.libroServicio.list({
                autor_idautor: this.autor.idautor + ""
            })

            if (result.state == "success") {
                console.log(result)
                this.libros = result.data ?? []

                // let libros = result.data ?? []
                // this.libros = libros.filter((l: ILibro) => l.autor_idautor == this.autor.idautor)
                // console.log(this.libros)
            }
        } catch (error) {

        }
    }
}