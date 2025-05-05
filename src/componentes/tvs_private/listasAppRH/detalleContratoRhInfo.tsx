import React from 'react'
import { IDetalleContratoRhInfoProps } from '../../../models/IProps'

const DetalleContratoRhInfo: React.FC<IDetalleContratoRhInfoProps> = ({ rHContract }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Tipo contrato: </p>
                        <p> {rHContract.tipoContrato} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha de inicio: </p>
                        <p> {rHContract.fechaInicio} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha finalización: </p>
                        <p> {rHContract.fechaFinalizacion} </p>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Contrato: </p>
                        <p> {rHContract.contrato} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Zona:</p>
                        <p> {rHContract.zonaContrato} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Municipio: </p>
                        <p> {rHContract.municipio} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Cargo: </p>
                        <p> {rHContract.cargo} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Area: </p>
                        <p> {rHContract.area} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Sueldo: </p>
                        <p> {rHContract.sueldo} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Auxilio de transporte: </p>
                        <p> {rHContract.auxilioTransporte} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Bono: </p>
                        <p> {rHContract.bono} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalleContratoRhInfo