import React, { useState } from 'react'
import { IOtroSiProps } from '../../../models/IProps'
import OtroSiVigencia from './otroSiVigencia';
import OtroSiSalarial from './otroSiSalarial';

const OtroSi: React.FC<IOtroSiProps> = ({ rHContratoId }) => {

    const [tipoOtroSi, setTipoOtroSi] = useState('INITIAL');

    const tiposOtroSi = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CAMBIO_VIGENCIA', label: 'Modificación de Vigencia' },
        { value: 'CAMBIO_ESTRUCTURA_SALARIAL', label: 'Cambio de Condiciones Salariales' }
    ]

    const vistaOtroSiForm = () => {
        switch (tipoOtroSi) {
            case 'CAMBIO_ESTRUCTURA_SALARIAL':
                return (
                    <>
                        <hr />
                        <h4 >Modificar estructura salarial</h4>
                        <OtroSiSalarial rHContratoId={rHContratoId} />
                    </>
                )
            case 'CAMBIO_VIGENCIA':
                return (
                    <>
                        <hr />
                        <h4 >Modificar vigencia</h4>
                        <OtroSiVigencia rHContratoId={rHContratoId} />
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <h4 >Gestionar un "Otro Si":</h4>
            </div>
            <p className="">
                La generación de un Otro Sí al contrato será posible únicamente en los siguientes casos:
            </p>
            <br />
            <p className="">
                ✔ Modificación de Vigencia: Aplicable cuando se requiera ajustar la duración del contrato.
            </p>
            <p className="">
                ✔ Cambio de Condiciones Salariales: Procedente en situaciones donde se establezcan modificaciones en la estructura salarial del acuerdo
            </p>
            <br />
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <select value={tipoOtroSi} onChange={(e) => setTipoOtroSi(e.target.value)} className='form-control' >
                        {
                            tiposOtroSi.map((key, i) => {
                                return (
                                    <option key={i} value={key.value}>{key.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
            </div>
            <div className="mt-3">
                {
                    vistaOtroSiForm()
                }
            </div>
            <br />
        </>
    )
}

export default OtroSi