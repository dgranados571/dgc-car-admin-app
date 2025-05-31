import React, { useEffect, useRef, useState } from 'react'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'
import { IContratoRHDto, IDetalleContratoRhProps, IFormRHHandle, IGenericResponse, IPropsModal } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faHandshake, faCheckSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import DetalleContratoRhInfo from './detalleContratoRhInfo'
import OtroSi from '../otroSi/otroSi'
import ContratoForm from '../registraContratoRH/contratoForm'
import { Cargando } from '../../tvs/loader/cargando'
import Modal from '../../tvs/modal/modal'
import { AuthServices } from '../../../services/authServices'

const DetalleContratoRh: React.FC<IDetalleContratoRhProps> = ({ rHContratoId, setRedirect, ejecutaModalComponent }) => {

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen1, setModalOpen1] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModalForm, setPropsModalForm] = useState<IPropsModal>({
        resultForm1: {},
        resultForm2: {},
        resultForm3: []
    })
    const [infoCargada, setInfoCargada] = useState(false)
    const [controlExecute, setControlExecute] = useState(false)

    const [redirectZone, setRedirectZone] = useState('')
    const [selectActualizaContrato, setSelectActualizaContrato] = useState('VIEW_DETALLE_CONTRATO_INFO')

    const causalesDeFinalizacion = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'UNILATERAL_POR_EMPLEADOR', label: 'Unilateral por parte del empleador' },
        { value: 'UNILATERAL_POR_COLABORADOR', label: 'Unilateral por parte del colaborador' },
        { value: 'FINALIZACION_VIGENCIA_CONTRATO', label: 'Finalización por vigencia de contrato' },
    ]

    const [causalFinalizaContrato, setCausalFinalizaContrato] = useState('INITIAL');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');

    const [causalFinalizaContratoRef, setCausalFinalizaContratoRef] = useState(false);
    const [fechaFinalizacionRef, setFechaFinalizacionRef] = useState(false);

    const contratoFormRef = useRef<IFormRHHandle>(null);

    const [contratosRhObj, setContratosRhObj] = useState<any>({})

    useEffect(() => {
        getDetalleContratosInfo()
    }, [controlExecute])

    const getDetalleContratosInfo = async () => {
        setCargando(true)
        const body = {
            "rHContratoId": rHContratoId,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 17);
            if (response.estado) {
                setContratosRhObj(response.objeto)
                setInfoCargada(true)
            } else {
                ejecutaModalComponent('Valla algo salió mal¡¡', response.mensaje, 'MODAL_CONTROL_1')
            }
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent('Valla algo salió mal¡¡', 'No fue posible consultar la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const finalizarContratoRH = () => {
        let formValidado = [];
        setCausalFinalizaContratoRef(false)
        if (causalFinalizaContrato === 'INITIAL') {
            formValidado.push('causalFinalizaContrato');
            setCausalFinalizaContratoRef(true)
        }
        setFechaFinalizacionRef(false)
        if (fechaFinalizacion.length === 0) {
            formValidado.push('causalFinalizaContrato');
            setFechaFinalizacionRef(true)
        }
        if (formValidado.length === 0) {
            const idPropExecute = {
                "action": "FINALIZARH",
                "idProp": contratosRhObj,
                causalFinalizaContrato,
                fechaFinalizacion
            }
            ejecutaModalComponent('Finalización de contrato', 'Está a punto de finalizar el contrato, Una vez confirmado, el contrato será cerrado y no podrá ser modificado', 'MODAL_CONTROL_2', idPropExecute)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const actualizaContratoAction = () => {
        let formValidado = [];
        let resultForm2 = null;
        if (contratoFormRef.current) {
            resultForm2 = contratoFormRef.current.funcionHandle1()
            if (!resultForm2) {
                formValidado.push('Errores en resultForm2');
            }
        } else {
            formValidado.push('Errores en resultForm2');
        }
        if (formValidado.length === 0) {
            setPropsModalForm({
                resultForm1: {},
                resultForm2,
                resultForm3: []
            })
            setTipoModal('MODAL_RESUMEN_FORM_2')
            setModalOpen(true)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const actualizaContratoService = async () => {
        setModalOpen(false)
        setCargando(true)
        const infoForm2: IContratoRHDto = {
            contrato: propsModalForm.resultForm2.prop0 || '',
            zonaContrato: propsModalForm.resultForm2.prop1 || '',
            municipio: propsModalForm.resultForm2.prop2 || '',
            tipoContrato: propsModalForm.resultForm2.prop10 || '',
            fechaInicio: propsModalForm.resultForm2.prop3 || '',
            fechaFinalizacion: propsModalForm.resultForm2.prop11 || '',
            cargo: propsModalForm.resultForm2.prop4 || '',
            area: propsModalForm.resultForm2.prop5 || '',
            sueldo: propsModalForm.resultForm2.prop6 || '',
            auxilioTransporte: propsModalForm.resultForm2.prop7 || '',
            bono: propsModalForm.resultForm2.prop8 || '',
            noContrato: contratosRhObj.contratoRHDto.noContrato || ''
        }
        const body = {
            "contratoRHEdita": infoForm2,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 16);
            let tituloModal = 'Valla algo salió mal¡¡'
            if (response.estado) {
                tituloModal = 'Actualización exitosa de información del contrato'
                if (contratoFormRef.current) {
                    contratoFormRef.current.funcionHandle2()
                }
                setControlExecute(!controlExecute)
                setSelectActualizaContrato('VIEW_DETALLE_CONTRATO_INFO')
            }
            ejecutaModalComponent1(tituloModal, response.mensaje, 'MODAL_CONTROL_1')
            setCargando(false)
        } catch (error) {
            setCargando(false)
            ejecutaModalComponent1('Valla algo salió mal¡¡', 'No fue posible el registro de la información, contacte al administrador', 'MODAL_CONTROL_1')
        }
    }

    const ejecutaModalComponent1 = (titulo: string, descripicion: string, tipoModal: string) => {
        setPropsModalForm({
            resultForm1: {
                prop0: titulo,
                prop1: descripicion,
            },
            resultForm2: {},
            resultForm3: []
        })
        setTipoModal(tipoModal)
        setModalOpen1(true)
    }

    const validateEditaContrato = () => {
        switch (selectActualizaContrato) {
            case 'VIEW_DETALLE_CONTRATO_INFO':
                return (
                    <>
                        {
                            infoCargada ?
                                <DetalleContratoRhInfo rHContract={contratosRhObj.contratoRHDto} />
                                :
                                <>Cargando ...</>
                        }
                        <div className="div-select-edit-contrato">
                            <button className='btn btn-link bottom-custom-link' onClick={() => setSelectActualizaContrato('VIEW_DETALLE_CONTRATO_EDITA')}>
                                <FontAwesomeIcon className='icons-table-ds' icon={faPencilAlt} /><p className='margin-icons'>Editar</p>
                            </button>
                        </div>
                    </>
                )
            case 'VIEW_DETALLE_CONTRATO_EDITA':
                return (
                    <>
                        <ContratoForm ref={contratoFormRef} editaContrato={true} rHContratoId={contratosRhObj} />
                        <div className='div-bottom-custom'>
                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => setSelectActualizaContrato('VIEW_DETALLE_CONTRATO_INFO')} >Cancelar</button>
                            <button className='btn btn-primary bottom-custom' onClick={() => actualizaContratoAction()} >Actualizar</button>
                        </div>
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }

    const panelFinalizaContrato = () => {
        if (contratosRhObj.contratoRHDto.fechaTerminacion) {
            return (
                <>
                    <div className="d-flex justify-content-between">
                        <h4 >Detalles de la finalización de contrato:</h4>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-info-item'>
                                <p className='p-label-form m-1'>Fecha de finalización: </p>
                                <p className='p-label-form m-1'>{contratosRhObj.contratoRHDto.fechaTerminacion} </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-info-item'>
                                <p className='p-label-form m-1'>Causal de finalización: </p>
                                <p className='p-label-form m-1'>{contratosRhObj.contratoRHDto.causaTerminacion} </p>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h4 >Finalizar contrato:</h4>
                    <p>En este módulo podrá gestionar la finalización del contrato. Por favor, seleccione la causa de finalización y especifique la fecha en la que se hará efectiva.</p>
                    <p>Asegúrese de revisar la información antes de confirmar el proceso:</p>
                    <div className="row mt-3">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Causal de finalización: </p>
                                <select value={causalFinalizaContrato} onChange={(e) => setCausalFinalizaContrato(e.target.value)} className={causalFinalizaContratoRef ? 'form-control form-control-error' : 'form-control'} >
                                    {
                                        causalesDeFinalizacion.map((key, i) => {
                                            return (
                                                <option key={i} value={key.value}>{key.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Fecha finalización: </p>
                                <input type="date" value={fechaFinalizacion} onChange={(e) => setFechaFinalizacion(e.target.value)} className={fechaFinalizacionRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                            <div className='div-bottom-custom'>
                                <button className='btn btn-primary bottom-custom' onClick={() => { finalizarContratoRH() }} >Finalizar</button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'VIEW_FINALIZAR_CONTRATO':
                return (
                    <div className='div-style-form'>
                        {
                            panelFinalizaContrato()
                        }
                    </div>
                )
            case 'VIEW_OTRO_SI':
                return (
                    <div className='div-style-form'>
                        <OtroSi rHContratoId={contratosRhObj} />
                    </div>
                )
            default:
                return (
                    <></>
                )
        }
    }

    const cancelaOperacionModal = () => {
        setTipoModal('')
        setModalOpen(false)
    }

    return (
        <>
            <div className='div-style-form'>
                <div className='div-titulo-ds'>
                    <h4 >Información personal:</h4>
                    <button className='btn btn-link bottom-custom-link' onClick={() => setRedirect('VISTA_LISTA_CONTRATO_RH')}>
                        <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
                    </button>
                </div>
                {
                    infoCargada ?
                        <DetalleRhInfo rHContract={contratosRhObj.recursoHumanoDto} />
                        :
                        <>Cargando ...</>
                }
                <hr />
                <div className="div-titulo-ch-detalle">
                    {
                        infoCargada ?
                            <>
                                <h4 >Detalle de la contratación # {contratosRhObj.contratoRHDto.noContrato} </h4>
                                <h4 >{contratosRhObj.contratoRHDto.estado} </h4>
                            </>
                            :
                            <>Cargando ...</>
                    }
                </div>
                {
                    validateEditaContrato()
                }
                <hr />
            </div>
            <div className="row m-3">
                <div className="col-12 col-sm-12 col-md-2 col-lg-2" ></div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 div-targer-admin-padre mt-0" >
                    <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_FINALIZAR_CONTRATO') }}>
                        <FontAwesomeIcon className='icon-menu-principal' icon={faCheckSquare} />
                        <div className='div-targer-action'>
                            <p className={redirectZone === 'VIEW_FINALIZAR_CONTRATO' ? 'p-menu-label-active' : 'p-menu-label'}>Finalizar</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 div-targer-admin-padre mt-0" >
                    <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_OTRO_SI') }}>
                        <FontAwesomeIcon className='icon-menu-principal' icon={faHandshake} />
                        <div className='div-targer-action'>
                            <p className={redirectZone === 'VIEW_OTRO_SI' ? 'p-menu-label-active' : 'p-menu-label'}>Otro Si</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-2 col-lg-2" ></div>
            </div>
            {
                validateRedirect()
            }
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={() => { actualizaContratoService() }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
                    :
                    <></>
            }
            {
                modalOpen1 ?
                    <Modal tipoModal={tipoModal} modalSi={() => { }} modalNo={() => { cancelaOperacionModal() }} propsModal={propsModalForm} />
                    :
                    <></>
            }
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default DetalleContratoRh