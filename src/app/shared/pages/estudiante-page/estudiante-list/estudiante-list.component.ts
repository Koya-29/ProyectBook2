import { Component, inject } from '@angular/core';
import { EstudianteService } from '../estudiante.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { EstudianteFormComponent } from '../estudiante-form/estudiante-form.component';
import { EstudianteDetailComponent } from '../estudiante-detail/estudiante-detail.component';
import { FormsModule } from '@angular/forms';
import { IEstudiante } from '../estudiante.helpers';
import { TextStateComponent } from '../../../ui/text-state/text-state.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-estudiante-list',
    standalone: true,
    imports: [DatePipe, TitleCasePipe, NgClass, FormsModule, TextStateComponent],
    templateUrl: './estudiante-list.component.html',
    styleUrl: './estudiante-list.component.css'
})
export class EstudianteListComponent {

    students: IEstudiante[] = []

    private estudianteServicio = inject(EstudianteService)
    private modalServicio = inject(NgbModal)
    private toastrServicio = -inject(ToastrService)

    seleccionada: IEstudiante = {} as IEstudiante

    seleccionar(idestudiante: IEstudiante) {
        this.seleccionada = idestudiante
    }

    ngOnInit() {
        this.getData()
    }

    texto_estudiante = ""

    async getData() {

        let date = await this.estudianteServicio.list({
            texto: this.texto_estudiante
        })
        if (date && date.state == "success") {

            this.students = date.data ?? []
        }
    }


    async add() {
        try {
            let ref = this.modalServicio.open(EstudianteFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = 'add'
            let estudiante: IEstudiante = await ref.result;
            this.students.unshift(estudiante)
        } catch (error) {
            console.log(error)
        }
    }

    async editar(estudiante: IEstudiante) {
        try {
            let ref = this.modalServicio.open(EstudianteFormComponent, { keyboard: false, backdrop: 'static' })
            ref.componentInstance.accion = 'edit'
            ref.componentInstance.estudiante = estudiante

            let _estudiante: IEstudiante = await ref.result
            Object.assign(estudiante, _estudiante)
        } catch (error) {
        }
    }


    async eliminar(estudiante: IEstudiante) {
        let result = await this.estudianteServicio.delete(estudiante)
        console.log(result)
        if (result && result.state == "success") {
            let index = this.students.findIndex(x => x.idestudiante == estudiante.idestudiante)
            if (index != -1) {
                this.students.splice(index, 1)
            }
        }
    }

    async ver(estudiante: IEstudiante) {
        try {
            let ref = this.modalServicio.open(EstudianteDetailComponent, { size: 'xl', backdrop: 'static', keyboard: false });
            ref.componentInstance.estudiante = estudiante;
            let _estudiante: IEstudiante = await ref.result;
            Object.assign(estudiante, _estudiante)
        } catch (error) {

        }
    }
}
// async getData() {
//     try {
//         let date = await this.estudianteServicio.getData({
//             texto: this.texto_estudiante
//         })
//         if (date && date.state == 'success') {
//             this.students = date.data ?? []
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// async eliminar(estudiante: IEstudiante) {
//     let result = await this.estudianteServicio.eliminarStudent(estudiante.idestudiante)
//     console.log(result)
//     if (result && result.state == "success") {
//         let index = this.students.findIndex(x => x.idestudiante == estudiante.idestudiante)
//         if (index != -1) {
//             this.students.splice(index, 1)
//         }
//     }
// }

// async add() {
//     try {
//         let ref = this.modalServicio.open(EstudianteFormComponent, { keyboard: false, backdrop: 'static' })
//         ref.componentInstance.accion = 'add'
//         let estudiante: IEstudiante = await ref.result;
//         this.students.unshift(estudiante)
//     } catch (error) {
//         console.log(error)
//     }
// }