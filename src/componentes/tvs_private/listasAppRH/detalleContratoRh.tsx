import React, { useState } from 'react'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'
import { IDetalleContratoRhProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import DetalleContratoRhInfo from './detalleContratoRhInfo'
import DetalleCursosRhInfo from './detalleCursosRhInfo'

const DetalleContratoRh: React.FC<IDetalleContratoRhProps> = ({ rHContratoId, setRedirect }) => {

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

    const finalizarContratoRH = ()=>{
        console.log(rHContratoId)
    }

    return (
        <>
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
                    </>
                    :
                    <></>
            }
            <hr />
            <h4 >Finalizar contrato:</h4>
            <div className="row">
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
            <br/><br/>
        </>
    )
}

export default DetalleContratoRh