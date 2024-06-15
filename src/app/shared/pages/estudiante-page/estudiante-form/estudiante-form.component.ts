import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteService } from '../estudiante.service';
import { IEstudiante, IEstudianteAdd } from '../estudiante.helpers';

@Component({
    selector: 'app-estudiante-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './estudiante-form.component.html',
    styleUrl: './estudiante-form.component.css'
})
export class EstudianteFormComponent {

    tipos_documentos: string[] = ['RUC', 'DNI', 'Otros'];

    @Input() accion = "add"
    @Input() estudiante?: IEstudiante;

    private activarModal = inject(NgbActiveModal)
    private estudianteServicio = inject(EstudianteService)

    estados = this.estudianteServicio.estados

    form = new FormGroup({
        'tipo_documento': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'numero_documento': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'nombre': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'apellidos': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'codigo': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'fecha_nacimiento': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'estado': new FormControl('1', [Validators.required]),
    })

    ngOnInit() {
        if (this.accion == "edit") {
            this.form.patchValue({
                tipo_documento: this.estudiante?.tipo_documento,
                numero_documento: this.estudiante?.numero_documento,
                nombre: this.estudiante?.nombre,
                apellidos: this.estudiante?.apellidos,
                codigo: this.estudiante?.codigo,
                fecha_nacimiento: this.estudiante?.fecha_nacimiento,
                estado: this.estudiante?.estado
            })
        }
    }

    get tipo_documentoControl(): FormControl {
        return this.form.get('tipo_documento') as FormControl
    }
    get numero_documentoControl(): FormControl {
        return this.form.get('numero_documento') as FormControl
    }
    get nombreControl(): FormControl {
        return this.form.get('nombre') as FormControl
    }
    get apellidosControl(): FormControl {
        return this.form.get('apellidos') as FormControl
    }
    get codigoControl(): FormControl {
        return this.form.get('codigo') as FormControl
    }
    get fecha_nacimientoControl(): FormControl {
        return this.form.get('fecha_nacimiento') as FormControl
    }
    get estadoControl(): FormControl {
        return this.form.get('estado') as FormControl
    }

    cerrarModal() {
        this.activarModal.dismiss('Modal cerrado')
    }

    async guardar() {
        if (!this.form.valid) return;
        let datos = this.form.value;

        if (this.accion == "add") {
            let estudiante: IEstudianteAdd = {
                numero_documento: datos.numero_documento!,
                tipo_documento: datos.tipo_documento!,
                nombre: datos.nombre!,
                apellidos: datos.apellidos!,
                codigo: datos.codigo!,
                fecha_nacimiento: datos.fecha_nacimiento!,
                createBy: '6',
                estado: datos.estado!
            }

            let result = await this.estudianteServicio.add(estudiante)
            if (result.state == "success") {
                this.activarModal.close(result.data)
            }
        } else {
            let estudiante: IEstudiante = {
                idestudiante: this.estudiante!.idestudiante,
                tipo_documento: datos.tipo_documento!,
                numero_documento: datos.numero_documento!,
                nombre: datos.nombre!,
                apellidos: datos.apellidos!,
                codigo: datos.codigo!,
                fecha_nacimiento: datos.fecha_nacimiento!,
                estado: datos.estado!
            }
            let result = await this.estudianteServicio.update(estudiante);
            if (result.state == "success") {
                this.activarModal.close(estudiante)
            }
        }
        this.activarModal.close("se edito con exito")
    }
}
