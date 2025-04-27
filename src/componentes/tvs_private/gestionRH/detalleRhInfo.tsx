import React from 'react'
import { IDetalleRhInfoProps } from '../../../models/IProps'

const DetalleRhInfo: React.FC<IDetalleRhInfoProps> = ({ rHContract }) => {

    return (
        <>
            <h4 >Información del recurso humano</h4>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'> Nombres: </p>
                        <p> {rHContract.nombres + ' ' + rHContract.apellidos} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'> No. Identificación: </p>
                        <p> {rHContract.numero_identificacion} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Correo personal:</p>
                        <p> {rHContract.correo_personal} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Celular: </p>
                        <p> {rHContract.celular} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Fecha de nacimiento: </p>
                        <p> {rHContract.fecha_nacimiento} </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'>Perfil: </p>
                        <p> {rHContract.perfil_profesional} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalleRhInfo