import { Component, Input, inject } from '@angular/core';
import { IAutor, IAutorAdd, IAutorUpdate } from '../autor.helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutorService } from '../autor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILibro } from '../../libro-page/libro.helpers';

@Component({
    selector: 'app-autor-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './autor-form.component.html',
    styleUrl: './autor-form.component.css'
})
export class AutorFormComponent {

    sexos: string[] = ['Masculino', 'Femenino'];
    nacionalidades: string[] = ['Peruano', 'Argentino', 'Brasilero', 'Koreano', 'Frances', 'Boliviano', 'Chileno', 'Otros'];

    libro: ILibro[] = []

    @Input() accion = "add"
    @Input() autor?: IAutor;

    private activarModal = inject(NgbActiveModal)
    private autorServicio = inject(AutorService)

    estados = this.autorServicio.estados

    form = new FormGroup({
        'nombre': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'apellidos': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'nacionalidad': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'sexo': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'fecha_nacimiento': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'estado': new FormControl('', [Validators.required])
    })

    ngOnInit() {
        if (this.accion == "edit") {
            this.form.patchValue({
                nombre: this.autor?.nombre,
                apellidos: this.autor?.apellidos,
                nacionalidad: this.autor?.nacionalidad,
                sexo: this.autor?.sexo,
                fecha_nacimiento: this.autor?.fecha_nacimiento,
                estado: this.autor?.estado
            })
        }
    }

    get nombreControl(): FormControl {
        return this.form.get('nombre') as FormControl
    }
    get apellidosControl(): FormControl {
        return this.form.get('apellidos') as FormControl
    }
    get nacionalidadControl(): FormControl {
        return this.form.get('nacionalidad') as FormControl
    }
    get sexoControl(): FormControl {
        return this.form.get('sexo') as FormControl
    }
    get fecha_nacimientoControl(): FormControl {
        return this.form.get('fecha_nacimiento') as FormControl
    }
    get estadoControl(): FormControl {
        return this.form.get('estado') as FormControl
    }

    cerrarModal() {
        this.activarModal.dismiss('exitoso')
    }

    async guardarAutor() {
        if (!this.form.valid) return;

        let datos = this.form.value;
        if (this.accion == "add") {
            let autor: IAutorAdd = {
                nombre: datos.nombre!,
                apellidos: datos.apellidos!,
                nacionalidad: datos.nacionalidad!,
                sexo: datos.sexo!,
                fecha_nacimiento: datos.fecha_nacimiento!,
                estado: datos.estado!,
                createBy: '9'
            }

            let result = await this.autorServicio.add(autor)
            if (result.state == "success") {

                this.activarModal.close(result.data)
            }
        } else {
            let autor: IAutorUpdate = {
                idautor: this.autor!.idautor,
                nombre: datos.nombre!,
                apellidos: datos.apellidos!,
                nacionalidad: datos.nacionalidad!,
                sexo: datos.sexo!,
                fecha_nacimiento: datos.fecha_nacimiento!,
                estado: datos.estado!
            }            
            let result = await this.autorServicio.update(autor);
            if (result.state == "success") {
                this.activarModal.close(autor)
            }
        }
        this.activarModal.close("se edito correctamente")
    }
}

