export interface IZoneProps { }

export interface IListasSelect {
    value: any,
    label: string
}

export interface IListasCursos {
    idList: number
    nombreCurso: string
    fechaCertificacion: string,
    fechaVencimiento: string,
    estado: string,
    diasPorVencer: number,
}

export interface FormRHHandle {
    funcionHandle1: () => any;
}
