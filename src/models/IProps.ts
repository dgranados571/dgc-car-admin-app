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

export interface IFormRHHandle {
    funcionHandle1: () => any;
}

export interface IModalProps {
    tipoModal: string;
    modalSi: Function,
    modalNo: Function,
    propsModal: IPropsModalRegistra
}

export interface IPropsModalRegistra {
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


