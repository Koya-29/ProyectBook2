


export enum EGeneralState {
    //estados basicos
    INACTIVE = '0',
    ACTIVE = '1',
    FINALIZED = '2',
    SUSPEND = '3',
    //estados de infraestructura
    MANTEINANCE = '10'

    //20-30 estados de matricula
}

//diccionario de estados
export const GeneralStateDictionary = {
    [EGeneralState.INACTIVE.toString()]: 'Inactivo',
    [EGeneralState.ACTIVE.toString()]: 'Activo',
    [EGeneralState.FINALIZED.toString()]: 'Finalizado',
    [EGeneralState.MANTEINANCE.toString()]: 'Mantenimiento',
    [EGeneralState.SUSPEND.toString()]: 'Suspendido'
}

export const GeneralStateColor = {
    [EGeneralState.INACTIVE.toString()]: 'danger',
    [EGeneralState.ACTIVE.toString()]: 'success',
    [EGeneralState.FINALIZED.toString()]: 'info',
    [EGeneralState.MANTEINANCE.toString()]: 'warning',
    [EGeneralState.SUSPEND.toString()]: 'danger'
}

// 2


export enum EMultiState {
    FINALIZED = EGeneralState.FINALIZED,
    ACTIVE = EGeneralState.ACTIVE,
    INACTIVE = EGeneralState.INACTIVE
}

export enum EState {
    ACTIVE = EGeneralState.ACTIVE,
    INACTIVE = EGeneralState.INACTIVE
}

export enum ETypeFile {
    PDF = 'pdf',
    EXCEL = 'excel'
}
export enum EAction {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete'
}