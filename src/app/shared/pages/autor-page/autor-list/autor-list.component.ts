import { Component, inject } from '@angular/core';
import { IAutor } from '../autor.helpers';
import { AutorService } from '../autor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { AutorFormComponent } from '../autor-form/autor-form.component';
import { AutorDetailComponent } from '../autor-detail/autor-detail.component';
import { FormsModule } from '@angular/forms';
import { TextStateComponent } from '../../../ui/text-state/text-state.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-autor-list',
    standalone: true,
    imports: [DatePipe, TitleCasePipe, NgClass, FormsModule, TextStateComponent],
    templateUrl: './autor-list.component.html',
    styleUrl: './autor-list.component.css'
})
export class AutorListComponent {

    authors: IAutor[] = []

    private autorService = inject(AutorService)
    private modalServicio = inject(NgbModal)
    private toastrServicio = inject(ToastrService)

    selected = "F"
    seleccionado: IAutor = {} as IAutor;

    ngOnInit() {
        this.getData()
    }

    select(campo: string) {
        this.selected = campo
    }

    seleccionar(autor: IAutor) {
        this.seleccionado = autor
    }

    texto_autor = ""


    async getData() {
        let data = await this.autorService.list({
            texto: this.texto_autor
        })
        if (data && data.state == "success") {
            this.toastrServicio.success('con exito', 'Se Inicio')
            this.authors = data.data ?? []
        }
    }

    async add() {
        try {
            let ref = this.modalServicio.open(AutorFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = "add"
            let autor: IAutor = await ref.result;
            this.authors.unshift(autor)
        } catch (error) {
            console.log(error)
        }
    }

    async editarAutor(autor: IAutor) {
        try {
            let ref = this.modalServicio.open(AutorFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = "edit"
            ref.componentInstance.autor = autor;

            let _autor: IAutor = await ref.result
            Object.assign(autor, _autor)
        } catch (error) {

        }
    }

    async eliminarAutor(autor: IAutor) {
        let result = await this.autorService.delete(autor)
        console.log(result)
        if (result && result.state == "success") {
            let index = this.authors.findIndex(x => x.idautor == autor.idautor)
            console.log(index);
            if (index != -1) {
                this.authors.splice(index, 1)
            }
        }
    }

    async ver(autor: IAutor) {
        try {
            let ref = this.modalServicio.open(AutorDetailComponent, { size: 'xl', backdrop: 'static', keyboard: false });
            ref.componentInstance.autor = autor;
            let _autor: IAutor = await ref.result;
            Object.assign(autor, _autor)
        } catch (error) {

        }
    }
}

// async getData() {
//     try {
//         let data = await this.autorService.getData({
//             texto: this.texto_autor
//         })
//         if (data && data.state == "success") {
//             this.authors = data.data ?? []
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// async eliminarAutor(autor: IAutor) {
//     let result = await this.autorService.eliminarAuthor(autor.idautor)
//     console.log(result)
//     if (result && result.state == "success") {
//         let index = this.authors.findIndex(x => x.idautor == autor.idautor)
//         console.log(index);
//         if (index != -1) {
//             this.authors.splice(index, 1)
//         }
//     }
// }