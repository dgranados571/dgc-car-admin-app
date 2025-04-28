import React from 'react'
import DetalleRhInfo from '../gestionRH/detalleRhInfo'
import { IDetalleContratoRhProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'

const DetalleContratoRh: React.FC<IDetalleContratoRhProps> = ({ rHContratoId, setRedirect }) => {
    return (
        <>
            <div className='div-titulo-ds'>
            <h4 >Información del recurso humano</h4>
                <button className='btn btn-link bottom-custom-link' onClick={() => setRedirect('VISTA_LISTA_CONTRATO_RH')}>
                    <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
                </button>
            </div>
            
            <DetalleRhInfo rHContract={rHContratoId.recursoHumanoDto} />
            <hr />
            <h4 >Detalle de la contratación</h4>
        </>
    )
}

export default DetalleContratoRh