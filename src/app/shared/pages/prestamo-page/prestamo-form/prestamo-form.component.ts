import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPrestamo, IPrestamoAdd } from '../prestamo.helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrestamoService } from '../prestamo.service';
import { IEstudiante } from '../../estudiante-page/estudiante.helpers';
import { ILibro } from '../../libro-page/libro.helpers';
import { EstudianteService } from '../../estudiante-page/estudiante.service';
import { LibroService } from '../../libro-page/libro.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-prestamo-form',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    providers: [
        DatePipe
    ],
    templateUrl: './prestamo-form.component.html',
    styleUrl: './prestamo-form.component.scss'
})
export class PrestamoFormComponent {

    estudiantes: IEstudiante[] = []
    libros: ILibro[] = []

    @Input() accion = 'add'
    @Input() prestamo?: IPrestamo

    private activeModal = inject(NgbActiveModal)
    private prestamoService = inject(PrestamoService)
    private estudianteService = inject(EstudianteService)
    private libroService = inject(LibroService)

    @Input() idlibro: string = "";
    @Input() idestudiante: string = "";


    //creamos un formulario mediante el modulo  FORMGROUP y definiendo variedad de campos con FOMRCONTROL
    form = new FormGroup({
        'fecha_prestamo': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'fecha_devolucion': new FormControl('', [Validators.minLength(2), Validators.maxLength(50), Validators.required]),
        'estudiante': new FormControl('', [Validators.required]),
        'libro': new FormControl('', [Validators.required])
    })
    //creamos un formulario mediante el modulo  FORMGROUP y definiendo variedad de campos con FOMRCONTROL



    ngOnInit() {
        //llamanmos a los metodos para tener los datos del estudiante y libro
        this.obtenerEstudiante()
        this.obtenerLibro()
        //llamanmos a los metodos para tener los datos del estudiante y libro


        alert(this.idlibro + " / " + this.idestudiante)

        //en la condicion le preguntamos que si accion es igual a EDIT
        //se actualizan los valores del formulario  con los datos del prestamo selecionado  esto incluye todo lo que esta dentro del
        //patchValue   
        if (this.accion == "edit") {
            this.form.patchValue({
                fecha_prestamo: this.prestamo?.fecha_prestamo,
                fecha_devolucion: this.prestamo?.fecha_devolucion,
                estudiante: this.prestamo?.estudiante_idestudiante + "",
                libro: this.prestamo?.libro_idlibro + ""
            })
        }
        else if (this.accion == "add") {
            this.form.patchValue({
                estudiante: this.idestudiante,
                libro: this.idlibro
            })
        }
    }



    //utilizar la palabra ASYNC antes de la definicion de una funcion indica que la funcion devuelve una promesa
    async obtenerEstudiante() {
        //el codigo dentro del TRY se ejecutara  y si se produce algun error sera capturado en CATCH
        try {
            //creamos una variable la cual utilizaremos la palabra AWAIT
            let result = await this.estudianteService.getData({})

            if (result.state == "success") {
                this.estudiantes = result.data ?? []
            }
        } catch (error) {
            console.error(error)
        }
    }

    async obtenerLibro() {
        try {
            let result = await this.libroService.getData({})

            if (result.state == "success") {
                this.libros = result.data ?? []
            }
        } catch (error) {
            console.error(error)
        }
    }


    get fecha_prestamoControl(): FormControl {
        return this.form.get('fecha_prestamo') as FormControl
    }
    get fecha_devolucionControl(): FormControl {
        return this.form.get('fecha_devolucion') as FormControl
    }
    get estudianteControl(): FormControl {
        return this.form.get('estudiante') as FormControl
    }
    get libroControl(): FormControl {
        return this.form.get('libro') as FormControl
    }

    cerrarModal() {
        this.activeModal.dismiss("Modal cerrado con exito")
    }


    async guardarPrestamo() {
        if (!this.form.valid) return
        let datos = this.form.value;
        if (this.accion == "add") {
            let prestamo: IPrestamoAdd = {
                fecha_prestamo: datos.fecha_prestamo!,
                fecha_devolucion: datos.fecha_devolucion!,
                libro_idlibro: +datos.libro!,
                estudiante_idestudiante: +datos.estudiante!,
                createBy: '1',
                estado: '1'
            }

            let result = await this.prestamoService.agregarLoan(prestamo);

            if (result.state == "success") {

                let estudiante = this.estudiantes.find(estudiante => estudiante.idestudiante == result.data.estudiante_idestudiante)
                if (estudiante) {
                    result.data.student = estudiante
                }

                let libro = this.libros.find(libro => libro.idlibro == result.data.libro_idlibro)
                if (libro) {
                    result.data.book = libro
                }
                this.activeModal.close(result.data)
            }
        } else {
            let prestamo: IPrestamo = {
                fecha_prestamo: datos.fecha_prestamo!,
                fecha_devolucion: datos.fecha_devolucion!,
                idprestamo: this.prestamo!.idprestamo,
                estudiante_idestudiante: +datos.estudiante!,
                libro_idlibro: +datos.libro!
            }

            let result = await this.prestamoService.editarLoan(this.prestamo?.idprestamo!, prestamo);

            if (result.state == "success") {

                let estudiante = this.estudiantes.find(estudiante => estudiante.idestudiante == prestamo.estudiante_idestudiante)
                prestamo.student = estudiante;

                let libro = this.libros.find(libro => libro.idlibro == prestamo.libro_idlibro)
                prestamo.book = libro;
                this.activeModal.close(prestamo)
            }
        }
        this.activeModal.close("Se guardo con exito")

    }

}
