import { Component, inject } from '@angular/core';
import { LibroService } from '../libro.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibro } from '../libro.helpers';
import { LibroFormComponent } from '../libro-form/libro-form.component';
import { LibroDetailComponent } from '../libro-detail/libro-detail.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-libro-list',
    standalone: true,
    imports: [TitleCasePipe, NgClass, FormsModule],
    templateUrl: './libro-list.component.html',
    styleUrl: './libro-list.component.css'
})
export class LibroListComponent {

    books: ILibro[] = []

    private libroServicio = inject(LibroService)
    private modalServicio = inject(NgbModal)

    ngOnInit() {
        this.getData()
    }

    selected: ILibro = {} as ILibro

    seleccionar(idlibro: ILibro) {
        this.selected = idlibro
    }

    buscador(data: string) {
        console.log({ data });
        if (data.length === 0) {
            this.getData();

        } else {

            this.books = this.books.filter(libro => libro.titulo.toLowerCase().includes(data.toLowerCase()));
        }
    }
    texto = ""
    // AQUI SOLO DEBISTE AUMENTAR ASI COMO EN LS PRESTAMOS EL TEMA DE PARAMS
    // SE ENTENDIO? 
    //si Ing, disculpe
    // YA AUMENTA A LOS DEMAS
    async getData() {
        try {
            let date = await this.libroServicio.getData({
                texto: this.texto
            })
            if (date && date.state == 'success') {
                this.books = date.data ?? []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add() {
        try {
            let ref = this.modalServicio.open(LibroFormComponent)
            ref.componentInstance.accion = "add"
            let libro: ILibro = await ref.result;
            this.books.unshift(libro)
        } catch (error) {
            console.log(error)
        }
    }

    async eliminar(libro: ILibro) {
        let result = await this.libroServicio.eliminarBook(libro.idlibro)
        if (result && result.state == "success") {
            let index = this.books.findIndex(x => x.idlibro == libro.idlibro)
            if (index != -1) {
                this.books.splice(index, 1)
            }
        }
    }

    async editar(libro: ILibro) {
        try {
            let ref = this.modalServicio.open(LibroFormComponent)
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
