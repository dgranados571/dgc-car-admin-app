import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IZoneProps { }

export interface IFormRHHandle {
    funcionHandle1: () => any;
    funcionHandle2: () => any;
}

export interface IMenuLateral {
    nombreItem: string;
    className: string;
    iconMenu: IconDefinition
    controlVista: string
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

export interface IMenuLateralProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selecionaMenu: Function,
    menuLateral: IMenuLateral[],
    openMenu: boolean,
    infoMenuUsuario: IUsuarioSession
}

export interface IPaginacion {
    paginas: any[],
    totalPaginas: number,
    paginaActual: number
}

export interface IPaginadorProps {
    elementsPaginacion: any
    setElementsPaginacion: React.Dispatch<React.SetStateAction<any>>;
}

export interface IZoneRootProps {
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession,
    zonaConsulta: string
}

export interface IZoneAdminProps {
    infoMenuUsuario: IUsuarioSession
    zonaConsulta: string
}

export interface IListaRhProps {
    setRedirectZone: React.Dispatch<React.SetStateAction<string>>;
    setRHContract: React.Dispatch<React.SetStateAction<any>>;    
}

export interface IListaContratosRhProps {
    ejecutaModalComponent: Function
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setRHContratoId: React.Dispatch<React.SetStateAction<any>>;
    setControlExecute: React.Dispatch<React.SetStateAction<boolean>>;
    controlExecute: boolean;
    zonaConsulta: string;
}

export interface IDetalleContratoRhProps {
    ejecutaModalComponent: Function
    rHContratoId:any
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
}

export interface IRegistraRhProps {
    setRedirectZone: React.Dispatch<React.SetStateAction<string>>;
}

export interface IContratoRhProps {
    rHContract: any;
    setRedirectZone: React.Dispatch<React.SetStateAction<string>>;
}

export interface IDetalleRhInfoProps {
    rHContract: any;
}

export interface IDetalleContratoRhInfoProps {
    rHContract: any;
}

export interface IDetalleCursosRhInfoProps {
    rHContract: ICursosRHDto[];
}

export interface IUsuariosAppProps {
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string
}

export interface IUsuarioSession {
    usuario: string;
    nombre_completo: string;
    id_procesamiento: string
}

export interface IListasCursos {
    idList: number
    nombreCurso: string
    fechaCertificacion: string,
    fechaVencimiento: string,
    estado: string,
    diasPorVencer: number,
}

export interface IListaContratosRhPadreProps {
    zonaConsulta: string   
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
    rHContracts?: any[]
    functionSi?: Function
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
    prop9?: string;
    prop10?: string;
    prop11?: string;
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
    tipoContrato: string;
    fechaInicio: string;
    fechaFinalizacion: string;
    cargo: string;
    area: string;
    sueldo: string;
    auxilioTransporte: string;
    bono: string;
    noContrato: string;
}

export interface ICursosRHDto {
    nombreCurso: string;
    fechaCurso: string;
    estado: string;

    fechaVencimiento?: string;
    diasPorVencer?: string;
}

export interface IResultDashBoardInfo {
    totalRH: string;
    totalContratos: string;
    tasaDeContratacion: IPieValues[]
}

export interface IPieValues {
    name: string;
    value: number;
}

