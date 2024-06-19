import { Component, Input } from '@angular/core';
import { EGeneralState, EState, GeneralStateColor, GeneralStateDictionary } from '../../enum';

@Component({
    selector: 'app-text-state',
    standalone: true,
    templateUrl: './text-state.component.html',
    styleUrl: './text-state.component.scss'
})
export class TextStateComponent {

    //se tiene una propiedad de entrada llamada state el tipo de dato puede ser Estate, string, number, undifined
    /* tenemos una propiedad de entrada con un identificador state que puede tener uno de los siguientes tipos de datos
    una constante definida en la enumeracion EState, una cadena de texto, un numero, o un valor indefinido */
    @Input() state: EState | string | number | undefined;
    @Input() EStateCustom: { [x: string]: string } = GeneralStateDictionary;
    @Input() EStateCustomColor: { [x: string]: string } = GeneralStateColor;
    /******tenemos una propiedad con un identificador EStateCustom que es de tipo objeto, donde las claves y los valores
    de dicho  objeto son de cadena de texto el valor inicial de esta propiedad es asignado al objeto GeneralStateDictionary*********/

    denomination: string = "";
    color: string = "";

    /* tenemos un metodo llamado ngOnchages que detecta los cambios de la propiedad Input, este metodo
    se ejecuta automaticamente cuando ocurren cambio en las propiedades. Dentro del metodo se realizan dos
    asignaciones, la primera asigna una propiedad denomination que va ser igual al metodo stateFormatpasando el valor
    de la propiedad state como argumento */
    ngOnChanges(): void {
        this.denomination = this.stateFormat(this.state);
        this.color = this.stateColor(this.state);
        //se utiliza para detectar cambios en la propiedad Input() de un componente
        //este metodo se llama cada vez que hay un cambio en la propiedad
        /* se llama al inicio cuando angular inicializa el componente con las propiedades de entrada
        cada vez que cambia, esto puede ocurrir debido a la interacion del usuario, canbios de la palicacion
        actualizaciones de datos ect */
    }

    private stateFormat = (state?: EGeneralState | string | number): string => {
        if (state === undefined) return 'Estado no definido';
        return this.EStateCustom[state.toString()] || 'Estado no definido';
    }

    private stateColor = (state?: EGeneralState | string | number): string => {
        if (state === undefined) return 'Estado no definido';
        return this.EStateCustomColor[state.toString()] || 'Estado no definido';
    }
}

export declare interface IState2 {
    label: string;
    color: string;
    icon: string;
    background: string;
}
/* tenemos una declaracion de una interfaz llamada IState2, esta interfaz define la estructura
de un objeto que debe tener cuatro propiedades donde cada propiedad es una cadeba de texto */
/* DECLARE se utiliza cuando se importa una interfaz desde una biblioteca externa o un modulo de terceros
y solo se reuiere su definicion pero no su implementacion.
se utiliza cuando no se tiene acceso a la implementacion de la interfaz, ya que promieve de una fuente externa*/

//el DECLARE se utiliza para definir la interfaz sin iniciarla esto significa que la interfaz siki define
//la estructura de los objetos, pero no crea una instancia real de ellos
