export interface IZoneProps { }

export interface IFormRHHandle {
    funcionHandle1: () => any;
    funcionHandle2: () => any;
}

export interface IListasSelect {
    value: any,
    label: string
}

export interface IGenericResponse {
    estado: boolean,
    mensaje: string,
    objeto: any
}

export interface IListasCursos {
    idList: number
    nombreCurso: string
    fechaCertificacion: string,
    fechaVencimiento: string,
    estado: string,
    diasPorVencer: number,
}

export interface IModalProps {
    tipoModal: string;
    modalSi: Function,
    modalNo: Function,
    propsModal: IPropsModal
}

export interface IPropsModal {
    resultForm1: IPropsResultForm
    resultForm2: IPropsResultForm
    resultForm3: IListasCursos[]
}

export interface IPropsResultForm {
    prop0?: string;
    prop1?: string;
    prop2?: string;
    prop3?: string;
    prop4?: string;
    prop5?: string;
    prop6?: string;
    prop7?: string;
    prop8?: string;
}

export interface IRecursoHumanoDto {
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    numeroIdentificacion: string;
    celular: string;
    correoPersonal: string;
    correoCorporativo: string;
    perfilProfesional: string;
}

export interface IContratoRHDto {
    contrato: string;
    zonaContrato: string;
    municipio: string;
    fechaInicio: string;
    fechaFinalizacion: string;
    cargo: string;
    area: string;
    sueldo: string;
    auxilioTransporte: string;
    bono: string;
}

export interface ICursosRHDto {
    nombreCurso: string;
    fechaCurso: string;
    estado: string;    
}

