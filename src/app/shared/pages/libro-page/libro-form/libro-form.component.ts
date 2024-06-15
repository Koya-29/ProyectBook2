import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibro, ILibroAdd } from '../libro.helpers';
import { LibroService } from '../libro.service';
import { AutorService } from '../../autor-page/autor.service';
import { IAutor } from '../../autor-page/autor.helpers';
import { auto } from '@popperjs/core';

@Component({
    selector: 'app-libro-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './libro-form.component.html',
    styleUrl: './libro-form.component.css'
})
export class LibroFormComponent {

    autores: IAutor[] = []

    @Input() accion = 'add'
    @Input() libro?: ILibro

    private activeModal = inject(NgbActiveModal)
    private libroServicio = inject(LibroService)
    private autorServicio = inject(AutorService)



    form = new FormGroup({
        'cantidad': new FormControl(0, [Validators.minLength(1), Validators.maxLength(600), Validators.required]),
        'cantidad_disponible': new FormControl(0, [Validators.minLength(1), Validators.maxLength(600), Validators.required]),
        'cantidad_prestado': new FormControl(0, [Validators.minLength(1), Validators.maxLength(600), Validators.required]),
        'editorial': new FormControl('', [Validators.minLength(2), Validators.maxLength(600), Validators.required]),
        'titulo': new FormControl('', [Validators.minLength(2), Validators.maxLength(60), Validators.required]),
        'autor': new FormControl('', [Validators.required]),
        'estado': new FormControl('', [Validators.required])
    })


    // ngOnInit() {

    //     this.obtenerDato()

    //     if (this.accion == 'edit') {
    //         this.form.patchValue({
    //             cantidad: this.libro?.cantidad,
    //             cantidad_prestado: this.libro?.cantidad_prestado,
    //             cantidad_disponible: this.libro?.cantidad_disponible,
    //             editorial: this.libro?.editorial,
    //             titulo: this.libro?.titulo,
    //             autor: this.libro?.autor_idautor + "",
    //             estado: this.libro?.estado
    //         })
    //     }
    // }

    // async obtenerDato() {
    //     try {
    //         let result = await this.autorServicio.getData({})
    //         if (result.state == "success") {
    //             this.autores = result.data ?? []
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


    get cantidadControl(): FormControl {
        return this.form.get('cantidad') as FormControl
    }
    get cantidad_disponibleControl(): FormControl {
        return this.form.get('cantidad_disponible') as FormControl
    }
    get cantidad_prestadoControl(): FormControl {
        return this.form.get('cantidad_prestado') as FormControl
    }
    get editorialControl(): FormControl {
        return this.form.get('editorial') as FormControl
    }
    get tituloControl(): FormControl {
        return this.form.get('titulo') as FormControl
    }
    get autorControl(): FormControl {
        return this.form.get('autor') as FormControl
    }
    get estadoControl(): FormControl {
        return this.form.get('estado') as FormControl
    }

    cerrarModal() {
        this.activeModal.dismiss('Modal cerrado')
    }

    async guardar() {
        if (!this.form.valid) return
        let datos = this.form.value;
        if (this.accion == "add") {
            let libro: ILibroAdd = {
                cantidad: +datos.cantidad!,
                cantidad_disponible: +datos.cantidad!,
                cantidad_prestado: +datos.cantidad_prestado!,
                autor_idautor: +datos.autor!,
                editorial: datos.editorial!,
                titulo: datos.titulo!,
                createBy: '1',
                estado: datos.estado!,
            }
            let result = await this.libroServicio.agregarBook(libro);
            if (result.state == "success") {
                let autor = this.autores.find(autor => autor.idautor == result.data.autor_idautor)
                if (auto) {
                    result.data.autor = autor;
                }
                this.activeModal.close(result.data)
            }
        } else {
            let libro: ILibro = {
                idlibro: this.libro!.idlibro,
                cantidad: datos.cantidad!,
                cantidad_disponible: datos.cantidad_disponible!,
                cantidad_prestado: datos.cantidad_prestado!,
                editorial: datos.editorial!,
                titulo: datos.titulo!,
                autor_idautor: +datos.autor!,
                estado: datos.estado!
            }
            let result = await this.libroServicio.editarBook(this.libro?.idlibro!, libro);
            if (result.state == "success") {
                let autor = this.autores.find(autor => autor.idautor == libro.autor_idautor)
                libro.autor = autor;
                this.activeModal.close(libro)
            }
        }
        this.activeModal.close("Se guardo correctamente")
    }

}