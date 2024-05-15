import { Component, inject } from '@angular/core';
import { IHome } from '../home.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../home.service';
import { HomeFormComponent } from '../home-form/home-form.component';
import { HomeDetailComponent } from '../home-detail/home-detail.component';

@Component({
    selector: 'app-home-list',
    standalone: true,
    imports: [],
    templateUrl: './home-list.component.html',
    styleUrl: './home-list.component.css'
})
export class HomeListComponent {

    homes: IHome[] = [];


    private modalServicio = inject(NgbModal);
    private homeServicio = inject(HomeService);




    async getData() {
        try {
            let data = await this.homeServicio.getdataauthor()
            if (data && data.state == "success") {
                this.homes = data.data ?? []
            }
        } catch (error) {

        }
    }



    async add() {
        try {
            let ref = this.modalServicio.open(HomeFormComponent);
            ref.componentInstance.accion = "add"
            let home: IHome = await ref.result;
            this.homes.unshift(home)
        } catch (error) {

        }
    }


    async editar(home: IHome) {
        try {
            let ref = this.modalServicio.open(HomeFormComponent)
            ref.componentInstance.accion = 'edit'
            ref.componentInstance.home = home

            let _home: IHome = await ref.result
            Object.assign(home, _home)
        } catch (error) {

        }
    }

    async eliminar(home: IHome) {
        try {
            let result = await this.homeServicio.eliminarauthor(home.idautor)
            if (result && result.state == "success") {
                let index = this.homes.findIndex(x => x.idautor == home.idautor)
                if (index != -1) {
                    this.homes.splice(index, -1)
                }
            }
        } catch (error) {

        }
    }

    async ver(home: IHome) {
        try {
            let ref = this.modalServicio.open(HomeDetailComponent);
            ref.componentInstance.home = home;
            let _home: IHome = await ref.result;
            Object.assign(home, _home)
        } catch (error) {

        }
    }


















}
