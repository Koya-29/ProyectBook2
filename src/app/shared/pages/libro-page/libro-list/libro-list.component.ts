import { Component, Input, inject } from '@angular/core';
import { LibroService } from '../libro.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibro } from '../libro.helpers';
import { LibroFormComponent } from '../libro-form/libro-form.component';
import { LibroDetailComponent } from '../libro-detail/libro-detail.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextStateComponent } from '../../../ui/text-state/text-state.component';
import { ToastrService } from 'ngx-toastr';
import { ModalEliminarComponent } from '../../../components/modal-eliminar/modal-eliminar.component';

@Component({
    selector: 'app-libro-list',
    standalone: true,
    imports: [TitleCasePipe, NgClass, FormsModule, TextStateComponent],
    templateUrl: './libro-list.component.html',
    styleUrl: './libro-list.component.css'
})
export class LibroListComponent {

    @Input() autor: string = ""

    books: ILibro[] = []

    private libroServicio = inject(LibroService)
    private modalServicio = inject(NgbModal)
    private toastrServicio = inject(ToastrService)

    ngOnInit() {
        this.getData()
    }

    selected: ILibro = {} as ILibro

    seleccionar(idlibro: ILibro) {
        this.selected = idlibro
    }


    texto = ""
    // AQUI SOLO DEBISTE AUMENTAR ASI COMO EN LS PRESTAMOS EL TEMA DE PARAMS
    // SE ENTENDIO? 
    //si Ing, disculpe
    // YA AUMENTA A LOS DEMAS
    async getData() {
        let date = await this.libroServicio.list({
            texto: this.texto,
            autor_idautor: this.autor
        })
        if (date && date.state == 'success') {
            // this.toastrServicio.success('con exito', 'Se inicio')
            this.books = date.data ?? []
        }
    }

    async add() {
        try {
            let ref = this.modalServicio.open(LibroFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = "add"
            let libro: ILibro = await ref.result;
            this.books.unshift(libro)
        } catch (error) {
            console.log(error)
        }
    }

    async eliminar(libro: ILibro) {
        let modalEliminar = this.modalServicio.open(ModalEliminarComponent, { keyboard: false, backdrop: 'static' })
        try {
            let result = await modalEliminar.result
            // let result = await this.libroServicio.delete(libro)
            if (result === 'eliminar') {
                result = await this.libroServicio.delete(libro)
            }

            if (result && result.state == "success") {
                let index = this.books.findIndex(x => x.idlibro == libro.idlibro)
                if (index != -1) {
                    this.books.splice(index, 1)
                }
            }
        } catch (error) { }

    }

    async editar(libro: ILibro) {
        try {
            let ref = this.modalServicio.open(LibroFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = "edit"
            ref.componentInstance.libro = libro;

            let _libro: ILibro = await ref.result;
            Object.assign(libro, _libro)
        } catch (error) {

        }
    }

    async ver(libro: ILibro) {
        try {
            let ref = this.modalServicio.open(LibroDetailComponent, { size: 'xl', backdrop: 'static', keyboard: false })
            ref.componentInstance.libro = libro;
            let _libro: ILibro = await ref.result;
            Object.assign(libro, _libro)
        } catch (error) {

        }
    }
}
