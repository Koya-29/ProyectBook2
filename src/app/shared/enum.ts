// cada constante dentro de un ENUM se asigna automaticamente a un valor numerico comenzando
//desde 0
export enum EGeneralState {
    //estados basicos
    INACTIVE = '0',
    /* tenemos una enumeracion llamada EGEneralState que define un conjunto de constante donde cada una de ellas tiene una valor
    asignado como cadena de texto, estas constantes representan diferentes esatados generales dentro de una aplicacion */
    ACTIVE = '1',
    FINALIZED = '2',
    //clave    valor
    //cada clave es un identificador y cada valor es una cadena de texto
    //al utilizar un enum puedes hacer referencia a las constantes por su nombre en lugar de utilizar valores numericos
    //constantemente POR EJEMPLO
    //en lugar de escribir 0 para representar un estado inactivo se puede usar "EGeneralSate.INACTIVE"lo cual mejora la legibilidad y mantenibilidad del código
    SUSPEND = '3',
    //estados de infraestructura
    MANTEINANCE = '10'

    //20-30 estados de matricula
}

//diccionario de estados
export const GeneralStateDictionary = {
    //es un objeto cuyas claves son cadenas de texto y cuyos valores tambien son cadena de texto
    //en este caso los valores representan las descripciones o nombres lejibles de cada estado definiendo EGeneralState
    [EGeneralState.INACTIVE.toString()]: 'Inactivo',
    [EGeneralState.ACTIVE.toString()]: 'Activo',
    [EGeneralState.FINALIZED.toString()]: 'Finalizado',
    [EGeneralState.MANTEINANCE.toString()]: 'Mantenimiento',
    [EGeneralState.SUSPEND.toString()]: 'Suspendido'
    //el toString se para convertir el valor del Emun a una cadena de texto, ya que las claves de un objeto en JAVASCRIPt
    //deben ser cadenas de texto o simbolos
}

/*tenemos una constante llamada GeneralStateColor que es un objeto donde las claves son cadena de texto utilizando el metodo
toString (dado que los valores de un emun no son cadena de texto por defecto), los valores asociados a las claves son tambien cadena de texto*/
export const GeneralStateColor = {
    [EGeneralState.INACTIVE.toString()]: 'danger',
    [EGeneralState.ACTIVE.toString()]: 'success',
    [EGeneralState.FINALIZED.toString()]: 'info',
    [EGeneralState.MANTEINANCE.toString()]: 'warning',
    [EGeneralState.SUSPEND.toString()]: 'danger'
}

// 2
/* tenemos una declaracion de exportacion de una enumeracion llamada EMuliState, define un conjunto de constantes
que se asignan directamente a los valores*/
export enum EMultiState {
    FINALIZED = EGeneralState.FINALIZED,
    ACTIVE = EGeneralState.ACTIVE,
    INACTIVE = EGeneralState.INACTIVE
}

export enum EState {
    ACTIVE = EGeneralState.ACTIVE,
    INACTIVE = EGeneralState.INACTIVE
}

/* tenemos una declaracion de exportacion de una enumeracion llamada ETypeFile. Esta define
un conjunto de constantes que representan diferentes tipos de archivos */
export enum ETypeFile {
    PDF = 'pdf',
    EXCEL = 'excel'
}
export enum EAction {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete'
}