import React, { useState } from 'react'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'
import { IDetalleContratoRhProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faHandshake, faCheckSquare, faVcard } from '@fortawesome/free-solid-svg-icons'
import DetalleContratoRhInfo from './detalleContratoRhInfo'
import DetalleCursosRhInfo from './detalleCursosRhInfo'
import OtroSi from '../otroSi/otroSi'

const DetalleContratoRh: React.FC<IDetalleContratoRhProps> = ({ rHContratoId, setRedirect, ejecutaModalComponent }) => {

    const [redirectZone, setRedirectZone] = useState('VIEW_FINALIZAR_CONTRATO')

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
                "idProp": rHContratoId,
                causalFinalizaContrato,
                fechaFinalizacion
            }
            ejecutaModalComponent('Finalización de contrato', 'Está a punto de finalizar el contrato, Una vez confirmado, el contrato será cerrado y no podrá ser modificado', 'MODAL_CONTROL_2', idPropExecute)
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const panelFinalizaContrato = () => {
        if (rHContratoId.contratoRHDto.fechaTerminacion) {
            return (
                <>
                    <div className="d-flex justify-content-between">
                        <h4 >Detalles de la finalización de contrato:</h4>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-info-item'>
                                <p className='p-label-form m-1'>Fecha de finalización: </p>
                                <p className='p-label-form m-1'>{rHContratoId.contratoRHDto.fechaTerminacion} </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-info-item'>
                                <p className='p-label-form m-1'>Causal de finalización: </p>
                                <p className='p-label-form m-1'>{rHContratoId.contratoRHDto.causaTerminacion} </p>
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
                                <button className='btn btn-primary bottom-custom' onClick={() => { finalizarContratoRH() }} >Finalizar contrato</button>
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
                        <OtroSi rHContratoId={rHContratoId} />
                    </div>
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <br />
            <div className='div-style-form'>
                <div className='div-titulo-ds'>
                    <h4 >Información personal:</h4>
                    <button className='btn btn-link bottom-custom-link' onClick={() => setRedirect('VISTA_LISTA_CONTRATO_RH')}>
                        <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
                    </button>
                </div>
                <DetalleRhInfo rHContract={rHContratoId.recursoHumanoDto} />
                <hr />
                <div className="div-titulo-ch-detalle">
                    <h4 >Detalle de la contratación # {rHContratoId.contratoRHDto.noContrato} </h4>
                    <h4 >{rHContratoId.contratoRHDto.estado} </h4>
                </div>
                <DetalleContratoRhInfo rHContract={rHContratoId.contratoRHDto} />
                <hr />
                {
                    rHContratoId.cursosRHDto.length > 0 ?
                        <>
                            <h4 >Detalle de cursos:</h4>
                            <DetalleCursosRhInfo rHContract={rHContratoId.cursosRHDto} />
                            <hr />
                        </>
                        :
                        <></>
                }
            </div>
            <div className="row m-3">
                <div className="col-12 col-sm-12 col-md-2 col-lg-2" ></div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 div-targer-admin-padre mt-0" >
                    <div className='div-targer-admin' onClick={() => { setRedirectZone('VIEW_FINALIZAR_CONTRATO') }}>
                        <FontAwesomeIcon className='icon-menu-principal' icon={faCheckSquare} />
                        <div className='div-targer-action'>
                            <p className={redirectZone === 'VIEW_FINALIZAR_CONTRATO' ? 'p-menu-label-active' : 'p-menu-label'}>Finalizar Contrato</p>
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
        </>
    )
}

export default DetalleContratoRh