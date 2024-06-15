import { RouterModule, Routes } from '@angular/router';
import { AutorPageComponent } from './shared/pages/autor-page/autor-page.component';
import { PrestamoPageComponent } from './shared/pages/prestamo-page/prestamo-page.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EstudiantePageComponent } from './shared/pages/estudiante-page/estudiante-page.component';
import { LibroPageComponent } from './shared/pages/libro-page/libro-page.component';
import { DevolucionPageComponent } from './shared/pages/devolucion-page/devolucion-page.component';

export const routes: Routes = [
    {
        path: 'formhome',
        component: HomePageComponent
    },
    {
        path: 'formauthor',
        component: AutorPageComponent
    },
    {
        path: 'formloan',
        component: PrestamoPageComponent
    },
    {
        path: 'formstudent',
        component: EstudiantePageComponent
    },
    {
        path: 'formbook',
        component: LibroPageComponent
    },
    {
        path: 'formreturn',
        component: DevolucionPageComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
